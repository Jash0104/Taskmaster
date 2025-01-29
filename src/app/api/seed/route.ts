import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) { 

    await prisma.todo.deleteMany()


    const todos = await prisma.todo.createMany({
        data: [
            { description: 'Piedra del alma', complete: true },
            { description: 'Piedra del poder', complete: true },
            { description: 'Piedra del tiempo', complete: true },
            { description: 'Piedra del realidad', complete: true },
            { description: 'Piedra del espacio', complete: true },
        ]
    })

    

    return NextResponse.json({ todos })
}