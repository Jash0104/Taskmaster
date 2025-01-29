import { NextResponse, NextRequest } from 'next/server'
import * as yup from "yup"

import prisma from '@/lib/prisma'

export async function GET(request: Request) { 

    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10')
    const skip = Number(searchParams.get('skip') ?? '0')

    if ( isNaN( take ) || isNaN( skip ) ) 
        return NextResponse.json({ message: 'Pagination params (take/skip) must be numbers'}, { status: 400 })

    const todos = await prisma.todo.findMany({
        take,
        skip
    })

  return NextResponse.json( todos )
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false) // TODO: Mostrar algo interesante
})

export async function POST(request: Request) { 

    try {
        const data = await postSchema.validate( await request.json(), { stripUnknown: true })

        const todo = await prisma.todo.create({
            data
        })
    
        return NextResponse.json(todo)
        
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 })
    }
}