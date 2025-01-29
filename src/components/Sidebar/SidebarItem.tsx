"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
}

export const SidebarItem = ({ path, icon, title }: Props) => {
  const actualPath = usePathname();

  const isActive = actualPath === path;

  return (
    <li>
      <Link
        href={path}
        className={`flex gap-x-3 rounded-md p-2 text-sm font-semibold items-center ${
          isActive
            ? "bg-[#1f2937] text-white"
            : "text-[#9ca3af] hover:text-white hover:bg-[#1f2937]"
        }`}
      >
        {icon}
        {title}
      </Link>
    </li>
  );
};
  
