"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";

import styles from "./Item-active.module.css"

interface Props {
    path: string,
    icon: JSX.Element,
    title: string
}

export const SidebarItem = ({ path, icon, title }: Props) => {

  const actualPath = usePathname()

  return (
    <li>
        <Link href={path} className={`flex gap-x-3 rounded-md text-[#9ca3af] p-2 text-sm font-semibold items-center  ${ actualPath === path ? styles['item-active'] : styles.item }`}>
            { icon }
            { title }
        </Link>
    </li>
  )
}
