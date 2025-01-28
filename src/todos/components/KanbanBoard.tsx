"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { IoAddOutline } from "react-icons/io5";
import { useState } from "react";
import * as todosApi from "@/todos/helpers/todos";
import { useRouter } from "next/navigation";
import { TodoStatus } from "../helpers/todos";

interface Props {
  todos: Todo[];
}

const todoColumns: { id: TodoStatus; title: string }[] = [
  { id: "pending", title: "Pendientes" },
  { id: "in-progress", title: "En Progreso" },
  { id: "done", title: "Completadas" },
];

export const KanbanBoard = ({ todos: initialTodos }: Props) => {
  const router = useRouter();
  const [todos, setTodos] = useState(initialTodos);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const getTodosByStatus = (status: TodoStatus) => {
    if (status === "done") return todos.filter(todo => todo.complete);
    if (status === "in-progress") return todos.filter(todo => !todo.complete && todo.status === "in-progress");
    return todos.filter(todo => !todo.complete && (!todo.status || todo.status === "pending"));
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Si no hay destino o el destino es el mismo que el origen, no hacemos nada
    if (!destination || (destination.droppableId === source.droppableId)) return;

    const newStatus = destination.droppableId as TodoStatus;
    const todoId = draggableId;

    try {
      // Optimistic update
      setTodos(prev => prev.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            status: newStatus,
            complete: newStatus === "done"
          };
        }
        return todo;
      }));

      // Update in backend
      await todosApi.updateTodoStatus(todoId, newStatus);
      router.refresh();
    } catch (error) {
      console.error("Error updating todo status:", error);
      // Revert optimistic update on error
      setTodos(initialTodos);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    
    try {
      const newTodo = await todosApi.createTodo(newTodoTitle);
      setTodos(prev => [...prev, newTodo]);
      setNewTodoTitle("");
      router.refresh();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setTodos(prev => prev.filter(todo => todo.id !== id));
      await todosApi.deleteTodo(id);
      router.refresh();
    } catch (error) {
      console.error("Error deleting todo:", error);
      setTodos(initialTodos);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={addTodo} className="flex gap-2">
        <input
          type="text"
          placeholder="¿Qué necesitas hacer?"
          className="flex-1 px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <IoAddOutline size={22} />
        </button>
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {todoColumns.map((column) => (
            <div
              key={column.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <h3 className="mb-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                {column.title}
              </h3>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] transition-colors ${
                      snapshot.isDraggingOver ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      {getTodosByStatus(column.id).map((todo, index) => (
                        <Draggable
                          key={todo.id}
                          draggableId={todo.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`${
                                snapshot.isDragging ? "opacity-50" : ""
                              }`}
                            >
                              <TodoItem
                                todo={todo}
                                onDelete={deleteTodo}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
