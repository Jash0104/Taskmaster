import { Todo } from "@prisma/client"
import styles from "./TodoItem.module.css"
import { IoCheckbox, IoSquareOutline, IoTrashOutline } from "react-icons/io5"


interface Props {
    todo: Todo,
    // toogleTodo: (id: string, complete: boolean) => Promise<Todo>,
    onDelete?: (id: string) => void
}

export const TodoItem = ({ todo, onDelete }: Props) => {
  return (
    <div className={`
      border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all
      ${todo.complete ? 'border-green-200 bg-green-50' : 'border-gray-200'}
    `}>
        <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2 flex-1">
                <button
                    // onClick={() => toogleTodo(todo.id, !todo.complete)}
                    className={`
                        p-2 rounded-md cursor-pointer transition-colors
                        ${todo.complete ? 'text-green-600 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-100'}
                    `}>
                    {
                        todo.complete
                        ? <IoCheckbox size={24} />
                        : <IoSquareOutline size={24} />
                    }
                </button>
                <p className={`
                    flex-1 text-sm
                `}>
                    {/* ${todo.complete ? 'text-gray-500 line-through' : 'text-gray-700'} */}
                    {todo.description}
                </p>
            </div>
            
            {onDelete && (
                <button
                    onClick={() => onDelete(todo.id)}
                    className="p-2 rounded-md text-red-500 hover:bg-red-100 transition-colors"
                >
                    <IoTrashOutline size={20} />
                </button>
            )}
        </div>
    </div>
  )
}
