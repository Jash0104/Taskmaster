"use client";

import { Todo } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { TodoItem } from "./TodoItem";
import { useKanban } from "../context/KanbanContext";

interface Props {
  todo: Todo;
  index: number;
}

export const DraggableTodoItem = ({ todo, index }: Props) => {
  const { deleteTodo } = useKanban();

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${snapshot.isDragging ? "opacity-50" : ""}`}
        >
          <TodoItem
            todo={todo}
            onDelete={deleteTodo}
          />
        </div>
      )}
    </Draggable>
  );
};
