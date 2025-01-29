"use client";

import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useKanban } from "../context/KanbanContext";
import { addTodo } from "../actions/todo-actions";

export const CreateTodoForm = () => {
  const { createTodo } = useKanban();
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    
    // await addTodo(newTodoTitle);
    await createTodo(newTodoTitle);
    setNewTodoTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="¿Qué necesitas hacer?"
        className="flex-1 px-4 py-2 text-sm border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        <IoAddOutline size={22} />
      </button>
    </form>
  );
};
