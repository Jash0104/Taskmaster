"use client";

import { Todo } from "@prisma/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  todos: Todo[];
}

interface ChartData {
  name: string;
  total: number;
  color: string;
}

export const TodoBarChart = ({ todos }: Props) => {
  const data: ChartData[] = [
    {
      name: "Pendientes",
      total: todos.filter((todo) => !todo.complete && (!todo.status || todo.status === "pending")).length,
      color: "#f97316", // Orange
    },
    {
      name: "En Progreso",
      total: todos.filter((todo) => !todo.complete && todo.status === "in-progress").length,
      color: "#3b82f6", // Blue
    },
    {
      name: "Completadas",
      total: todos.filter((todo) => todo.complete).length,
      color: "#22c55e", // Green
    },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8">
            {data.map((entry, index) => (
              <Bar
                key={`cell-${index}`}
                dataKey="total"
                fill={entry.color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
