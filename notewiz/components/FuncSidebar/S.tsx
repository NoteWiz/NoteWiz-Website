"use client";
import React from "react";
import items from "./index";
import Link from "next/link";
import Image from "next/image";
import Plus from "@/assets/icons/plus.png";
import { useState } from "react";
import { ChevronFirst, ChevronLast } from "lucide-react";
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
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col bg-[#181818] p-6 pt-2 text-white max-sm:hidden  lg:w-[264px] rounded-tr-xl">
      <Link href="/home">
        <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] text-center cursor-pointer md:block dark:border-white mt-8 mb-10">
          Notewiz
        </p>
      </Link>
      <div className="flex flex-col gap-4 mb-36 mt-8">
        {items.map((item, index) => {
          const isActive =
            pathname === item.route || String.prototype.startsWith(item.route);
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-2 items-center p-4 rounded-lg justify-start hover:bg-[#00E340]",
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

export default S;