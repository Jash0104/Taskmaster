import prisma from "@/lib/prisma"


export const addTodo = async (description: string) => {
    try {
        const todo = await prisma.todo.create({
            data: {
                description
            }
        })
        return todo
        
    } catch (error) {
        console.error("Error creating todo:", error);
        throw error
    }
}