import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sideBarLinks } from "@/app/constants/index";


const Sidebar = () => {
  return (
    <div className="bg-[#FFDC4D] border-black border-r-2 w-1/4 h-full fixed top-0 left-0 rounded-r-md">
      <div className="flex flex-col w-full gap-6 px-6">

        {sideBarLinks.map((links) => (
          <Link href={links.route} key={links.label} className="flex items-center gap-4 my-3 ">
            <Image
              src={links.imgURL}
              alt={links.label}
              width={32}
              height={32}
            />
            <p className='text-black max-lg:hidden'>{links.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
