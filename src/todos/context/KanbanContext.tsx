"use client";

import { Todo } from "@prisma/client";
import { createContext, useContext, useState } from "react";
import * as todosApi from "@/todos/helpers/todos";
import { TodoStatus, createTodo } from '../helpers/todos';
import { useRouter } from "next/navigation";
import { addTodo } from "../actions/todo-actions";
import { revalidatePath } from "next/cache";

interface KanbanContextProps {
  todos: Todo[];
  getTodosByStatus: (status: TodoStatus) => Todo[];
  updateTodoStatus: (todoId: string, newStatus: TodoStatus) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  createTodo: (title: string) => Promise<void>;
  createTodoAction: (title: string) => Promise<void>;
}

const KanbanContext = createContext({} as KanbanContextProps);

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
  initialTodos: Todo[];
}

export const KanbanProvider = ({ children, initialTodos }: Props) => {
  const router = useRouter();
  const [todos, setTodos] = useState(initialTodos);

  const getTodosByStatus = (status: TodoStatus) => {
    if (status === "done") return todos.filter(todo => todo.complete);
    if (status === "in-progress") return todos.filter(todo => !todo.complete && todo.status === "in-progress");
    return todos.filter(todo => !todo.complete && (!todo.status || todo.status === "pending"));
  };

  const updateTodoStatus = async (todoId: string, newStatus: TodoStatus) => {
    try {
      setTodos(prev => prev.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, status: newStatus, complete: newStatus === "done" };
        }
        return todo;
      }));

      await todosApi.updateTodoStatus(todoId, newStatus);
      router.refresh();
    } catch (error) {
      console.error("Error updating todo status:", error);
      setTodos(initialTodos);
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

  const createTodo = async (title: string) => {
    try {
      const newTodo = await todosApi.createTodo(title);
      setTodos(prev => [...prev, newTodo]);
      router.refresh();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const createTodoAction = async (title: string) => {
    try {
      const newTodo = await addTodo(title);
      setTodos(prev => [...prev, newTodo]);
      revalidatePath('dashboard/server-todos');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KanbanContext.Provider value={{
      todos,
      getTodosByStatus,
      updateTodoStatus,
      deleteTodo,
      createTodo,
      createTodoAction
    }}>
      {children}
    </KanbanContext.Provider>
  );
};
