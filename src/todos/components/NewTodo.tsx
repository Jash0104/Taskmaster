"use client";

import { Todo } from "@prisma/client";
import { FormEvent, useState } from "react"
import { IoTrashOutline } from "react-icons/io5"
import * as todosApi from '@/todos/helpers/todos';
import { useRouter } from "next/navigation";


export const NewTodo = () => {

  const [description, setDescription] = useState("")
  const router = useRouter()


  const onSubmit = async ( evt: FormEvent ) => {
    evt.preventDefault()

    if ( description.trim().length === 0 ) return
    
    console.log(description)

    todosApi.createTodo( description )
    setDescription("")
    
    router.refresh()

  }

  return (
    <form className="mb-10" onSubmit={ onSubmit }>
        <div className="block text-md font-medium text-gray-900">Write a description for a new task</div>
        <div className="flex mt-2 w-full justify-between">
          <div className="flex w-full gap-3 items-center box-border">
            <div className="flex rounded-md shadow-xs ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md w-full">
              <input 
                type="text"  
                name="Description" 
                id="username" 
                onChange={ evt => setDescription( evt.target.value) }
                className="block flex-1 border-0 bg-transparent outline-hidden py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6" placeholder="Description" />
            </div>
            <button type="submit" className="flex px-4 items-center  h-full rounded-lg bg-[#111827] bg-transparent/80 text-white font-semibold">Create</button>
            <button className="flex px-4 items-center  h-full rounded-lg bg-[#b92525] bg-transparent/80 text-white font-semibold">
              <IoTrashOutline className="font-bold" size="25"/>
            </button>
          </div>
        </div>
    </form>
  )
}
