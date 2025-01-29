import { Lobster } from "next/font/google";
import { TbHomeCheck, TbListCheck, TbLogout, TbServer2, TbTag } from "react-icons/tb";
import { SidebarItem } from "./SidebarItem";
import { BsFillLightningChargeFill } from 'react-icons/bs';

const font = Lobster({ adjustFontFallback: true, weight: "400", subsets: ["latin"] });

const menuItems = [
	{
		path: "/dashboard",
		icon: <TbHomeCheck className="w-6 h-6"/>,
		title: "Dashboard"
	},
	{
		path: "/dashboard/todos",
		icon: <TbListCheck className="w-6 h-6"/>,
		title: "Tasks"
	},
	{
		path: "/dashboard/server-todos",
		icon: <TbServer2 className="w-6 h-6"/>,
		title: "Server Tasks"
	}
]

export const Sidebar = () => {
  return (
		<aside className="flex w-72 flex-col z-50 top-0 bottom-0 fixed">
			<div className="flex pb-4 px-6 bg-[#111827] flex-col overflow-y-auto gap-y-5 grow">
				<div className="flex items-center shrink-0 h-16 justify-center relative items-center">
					<div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-44 h-44 bg-[#05B8D6] rounded-full opacity-10 blur-2xl"></div>
					<div className="flex items-center gap-2 z-10">
						<BsFillLightningChargeFill className="text-[#05B8D6] w-7 h-7 animate-pulse" />
						<span className={`text-white text-4xl h-8 w-auto font-bold tracking-wide text-shadow`}>
							Taskmaster
						</span>
					</div>
				</div>
				<nav className="flex flex-1 flex-col">
					<ul className="flex flex-1 flex-col m-0 p-0 list-none gap-7">
						<li>
							<ul className="mx-[-0.5rem] m-0 p-0 list-none">
								{
									menuItems.map( item => (
										<SidebarItem key={ item.path } {...item }/>
									))
								}
							</ul>
						</li>
						<li>
							<div className="text-sm font-semibold text-[#9ca3af]">Your workspaces</div>
							<ul className="mx-[-0.5rem] m-0 p-0 list-none mt-1">
								<li>
									<a href="#" className="flex gap-x-3 rounded-md text-[#9ca3af] p-2 text-sm font-semibold items-center hover:text-white hover:bg-[#1f2937]">
										<span className="flex w-6 h-6 bg-[#374151] items-center justify-center rounded-lg ">U</span>
										Universidad
									</a>
								</li>
								<li>
									<a href="#" className="flex gap-x-3 rounded-md text-[#9ca3af] p-2 text-sm font-semibold items-center hover:text-white hover:bg-[#1f2937]">
										<span className="flex w-6 h-6 bg-[#374151] items-center justify-center rounded-lg ">Ko</span>
										Kontroll
									</a>
								</li>
							</ul>

						</li>
						<li className="mt-auto">
							<div className="w-full bg-[#9ca3afaf] h-[1px] -bottom-[-4.5rem] absolute left-0 "></div>
							<a href="#" className="flex gap-x-3 rounded-md text-[#9ca3af] p-2 text-sm font-semibold items-center hover:text-white hover:bg-[#1f2937]">
								<TbLogout className="w-6 h-6"/>
								Sign Out
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</aside>
  )
}
