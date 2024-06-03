"use client";
import React from "react";
import items from "@/components/FuncSidebar/index";
import Link from "next/link";
import Image from "next/image";
import Plus from "@/assets/icons/plus.png";
import { useState } from "react";
import { ChevronFirst, ChevronLast, CopyPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";


interface CB_SProps {
  createNewChat: () => void;
  handleClickTitle: (uniqueTitle: any) => void;
  uniqueTitles: string[];
}

const CB_S: React.FC<CB_SProps> = ({ createNewChat, handleClickTitle, uniqueTitles }) => {
  const pathname = usePathname();
  const [collapse, setCollapse] = useState(false);
  const handleClick = () => {
    console.log("clicked");
    setCollapse(!collapse);
  };

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#181818] p-6 pt-10 text-white max-sm:hidden lg:w-[264px] rounded-tr-xl">
      <div className="flex flex-col space-y-2">
        <Link href="/home">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] text-center cursor-pointer md:block dark:border-white mt-0 mb-0">
            Notewiz
          </p>
        </Link>
        <button
          onClick={createNewChat}
          className="bg-[#252525] border-[#00E340] border-2 hover:bg-[#00E340] hover:text-white text-white font-bold py-2 px-4 rounded w-full"
        >
          <CopyPlus className="inline-block mr-2" size={18} />
          New Chat
        </button>
      </div>

      <nav className="overflow-y-auto max-h-[200px] flex-grow">
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li
              key={index}
              onClick={() => handleClickTitle(uniqueTitle)}
              className="py-2 px-4 rounded hover:bg-[#00E340] hover:text-black cursor-pointer transition-colors duration-200"
            >
              {uniqueTitle}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col  mt-4 lg:mt-10  ">
        {items.map((item, index) => {
          const isActive = pathname === item.route || String.prototype.startsWith(item.route as string);
          return (
            <Link
              href={item.route as string}
              key={item.label}
              className={cn(
                "flex gap-2 items-center p-2 rounded-lg justify-start hover:bg-[#00E340]",
                { "bg-[#00E340]": isActive }
              )}
            >
              {React.createElement(item.src, { color: "white", size: 22 })}
              <p className="text-white">{item.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CB_S;