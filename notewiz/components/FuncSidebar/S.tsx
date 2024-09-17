"use client";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover";
import { useSession, signIn, signOut } from "next-auth/react";

import React, { useState } from "react";
import items from "./index";
import Link from "next/link";
import Image from "next/image";
import Plus from "@/assets/icons/plus.png";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const S = () => {
	const pathname = usePathname();
	const [collapse, setCollapse] = useState(false);

	const handleClick = () => {
		console.log("clicked");
		setCollapse(!collapse);
	};

	return (
		<section className="sticky left-0 top-0 flex h-screen w-fit flex-col bg-[#181818] p-6 pt-2 text-white max-sm:hidden lg:w-[264px] rounded-tr-xl overflow-y-auto">
			<Link href="/home">
				<p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] text-center cursor-pointer md:block dark:border-white mt-8 mb-10">
					Notewiz
				</p>
			</Link>
			<div className="flex flex-col gap-4 mb-36 mt-8 flex-grow">
				{items.map((item, index) => {
					const isActive = Array.isArray(item.route)
						? item.route.includes(pathname)
						: pathname === item.route;

					return (
						<Link
							href={
								Array.isArray(item.route)
									? item.route[0]
									: item.route
							}
							key={item.label}
							className={cn(
								"flex gap-2 items-center p-4 rounded-lg justify-start hover:bg-[#00E340]",
								{ "bg-[#00E340]": isActive }
							)}
						>
							{React.createElement(item.src, {
								color: "white",
								size: 22
							})}
							<p className="text-white">{item.label}</p>
						</Link>
					);
				})}
			</div>
			<div className=" flex flex-col gap-4 ml-1 mb-4 justify-end">
				<Popover>
					<PopoverTrigger>
						<div className="flex flex-row gap-3 hover:cursor-pointer hover:bg-[#00E340] rounded-lg p-4">
							<Settings />
							<p className="tracking-tight ">Settings</p>
						</div>
					</PopoverTrigger>
					<PopoverContent>
						<div className="flex flex-row gap-4 items-center rounded-lg hover:bg-[#181818] p-3 cursor-pointer"  onClick={() => signOut({ callbackUrl: "/login" })}>
              <LogOut color="white"/>
							<button className="  text-left text-white ">
								Logout
							</button>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</section>
	);
};

export default S;
