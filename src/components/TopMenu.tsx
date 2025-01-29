import Image from 'next/image'
import { TbBellRinging, TbSearch } from 'react-icons/tb'

export const TopMenu = () => {
  return (
		<div className="flex bg-white h-16 sticky z-40 items-center border-b-2 border-b-[#e5e7eb] px-8">
			<div className="flex flex-1 gap-x-6 self-stretch">
				<form action="#" className="flex flex-1 relative ">
					<TbSearch className="text-[#9ca3af] h-full absolute block align-middle cursor-pointer top-0 bottom-0 left-0 w-5" />
					<input type="text" placeholder="Search..." className="block text-sm text-[#111827] pl-8 pr-0 py-0 border-0 w-full h-full outline-hidden"/>
				</form>
				<div className="flex items-center gap-x-6">
					<button className="text-[#9ca3af] p-[0.625rem] m-[-0.625rem] bg-transparent">
						<TbBellRinging className="w-6 h-6 align-middle" />
					</button>
					<div className="relative">
						<button className="flex items-center text-trans normal-case bg-transparent p-[0.375rem] m-[-0.375rem]">
							<Image 
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
								alt="User Profile" 
								className="w-8 h-8 rounded-full max-w-full bg-[#f9fafb]"
								width={0}
								height={0}
							/>
							<span className="flex items-center">
								<span className="text-sm font-semibold text-[#111827] ml-4">Juan Acosta</span>
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
  )
}
