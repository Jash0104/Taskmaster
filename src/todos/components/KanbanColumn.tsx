"use client";

import { Droppable } from "@hello-pangea/dnd";
import { TodoStatus } from "../helpers/todos";
import { DraggableTodoItem } from "./DraggableTodoItem";
import { useKanban } from "../context/KanbanContext";

interface Props {
  id: TodoStatus;
  title: string;
}

export const KanbanColumn = ({ id, title }: Props) => {
  const { getTodosByStatus } = useKanban();
  const todos = getTodosByStatus(id);

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="mb-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
        {title}
      </h3>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] transition-colors ${
              snapshot.isDraggingOver ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex flex-col gap-2">
              {todos.map((todo, index) => (
                <DraggableTodoItem
                  key={todo.id}
                  todo={todo}
                  index={index}
                />
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
