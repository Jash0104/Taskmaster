import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

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
