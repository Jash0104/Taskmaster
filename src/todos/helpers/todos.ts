import { Todo } from "@prisma/client"
import axios from "axios"

export type TodoStatus = "pending" | "in-progress" | "done";

const AxiosInstance = axios.create({
    baseURL: "/api/todos",
    headers: {
        "Content-Type": 'application/json'
    }
})

export const updateTodo = async (id: string, complete: boolean) => {
    const todo = await AxiosInstance.put<Todo>(`/${id}`, {
        complete
    }).then(res => res.data)

    return todo
}

export const updateTodoStatus = async (id: string, status: TodoStatus) => {
    const complete = status === "done";
    const todo = await AxiosInstance.put<Todo>(`/${id}`, {
        status,
        complete
    }).then(res => res.data)

    return todo
}

export const createTodo = async (description: string) => {
    const todo = await AxiosInstance.post<Todo>("", {
        description
    }).then(res => res.data)

    return todo
}

export const deleteTodo = async (id: string) => {
    await AxiosInstance.delete<Todo>(`/${id}`)
}