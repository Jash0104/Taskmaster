import { NextResponse, NextRequest } from 'next/server'
import * as yup from "yup"

import prisma from '@/lib/prisma';

interface Segments { 
    params: { id: string } 
}

async function findTodoById(id: string) {
    const todo = await prisma.todo.findUnique({
        where: { id }
    })

    return todo
}


export async function GET(request: Request, { params }: Segments) { 

    const todo = await findTodoById( params.id )

    if ( !todo )
        return NextResponse.json({ message: `Todo with id ${ params.id } not found` }, { status: 404 })

    return NextResponse.json( todo , { status: 200 });
}

interface Segments {
  params: {
    id: string;
  };
}

const schema = yup.object({
  status: yup.string().oneOf(['pending', 'in-progress', 'done']).required(),
  complete: yup.boolean().required(),
});

export async function PUT(request: NextRequest, { params }: Segments) {
    try {
      const { id } = params;
      const { status, complete } = await schema.validate(await request.json());
  
      const todo = await prisma.todo.update({
        where: { id },
        data: { status, complete }
      });
  
      return NextResponse.json(todo);
    } catch (error) {
      console.log(error);
      return NextResponse.json(error, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: Segments) { 

    try {
        const todo = await findTodoById( params.id )
    
        if ( !todo )
            return NextResponse.json({ message: `Todo with id ${ params.id } not found` }, { status: 404 })
    
        await prisma.todo.delete({
            where: { id: params.id }
        })
    
        return NextResponse.json({ message: `Todo with id ${ params.id } deleted` }, { status: 200 });
    
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 400 })
    }
}

