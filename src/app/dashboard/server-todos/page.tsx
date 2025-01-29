import prisma from "@/lib/prisma";
import { KanbanBoard } from "@/todos/components/KanbanBoard";
import { NewTodo } from "@/todos/components/NewTodo";

export const metadata = {
 title: 'Task List',
 description: 'Task List',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ServerTodosPage() {

  const todos = await prisma.todo.findMany({
    orderBy: {
      description: "asc"
    }
  })

  return (
    <div className="p-6">
      <div className="w-full px-3 mx-auto">
        <KanbanBoard todos={todos} />
      </div>
    </div>
  );
}