"use client";

import { Todo } from "@prisma/client";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { TodoStatus } from "../helpers/todos";
import { KanbanProvider, useKanban } from "../context/KanbanContext";
import { CreateTodoForm } from "./CreateTodoForm";
import { KanbanColumn } from "./KanbanColumn";

const todoColumns: { id: TodoStatus; title: string }[] = [
  { id: "pending", title: "Pendientes" },
  { id: "in-progress", title: "En Progreso" },
  { id: "done", title: "Completadas" },
];

interface Props {
  todos: Todo[];
}

const KanbanBoardContent = () => {
  const { updateTodoStatus } = useKanban();

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || (destination.droppableId === source.droppableId)) return;

    const newStatus = destination.droppableId as TodoStatus;
    await updateTodoStatus(draggableId, newStatus);
  };

  return (
    <div className="flex flex-col gap-4">
      <CreateTodoForm />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {todoColumns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export const KanbanBoard = ({ todos }: Props) => {
  return (
    <KanbanProvider initialTodos={todos}>
      <KanbanBoardContent />
    </KanbanProvider>
  );
};
