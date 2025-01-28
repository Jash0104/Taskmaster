import prisma from "@/lib/prisma";
import { StatCard } from "@/components/dashboard/StatCard";
import { TodoBarChart } from "@/components/dashboard/TodoBarChart";
import {
  IoCheckboxOutline,
  IoClipboardOutline,
  IoPlayOutline,
} from "react-icons/io5";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard de la aplicación",
};

export default async function DashboardPage() {
  const todos = await prisma.todo.findMany();
  
  const pendingTodos = todos.filter(
    (todo) => !todo.complete && (!todo.status || todo.status === "pending")
  );
  const inProgressTodos = todos.filter(
    (todo) => !todo.complete && todo.status === "in-progress"
  );
  const completedTodos = todos.filter((todo) => todo.complete);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Grid de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Tareas Pendientes"
          value={pendingTodos.length}
          color="border-orange-500"
        >
          <IoClipboardOutline size={30} className="text-orange-500" />
        </StatCard>

        <StatCard
          title="En Progreso"
          value={inProgressTodos.length}
          color="border-blue-500"
        >
          <IoPlayOutline size={30} className="text-blue-500" />
        </StatCard>

        <StatCard
          title="Completadas"
          value={completedTodos.length}
          color="border-green-500"
        >
          <IoCheckboxOutline size={30} className="text-green-500" />
        </StatCard>
      </div>

      {/* Gráfica de barras */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Distribución de Tareas</h2>
        <TodoBarChart todos={todos} />
      </div>
    </div>
  );
}