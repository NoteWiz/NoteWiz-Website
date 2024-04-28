"use client";
import React from "react";
import items from "./index";
import Link from "next/link";
import Image from "next/image";
import Plus from "@/assets/icons/plus.png";
import { useState } from "react";
import { ChevronFirst, ChevronLast } from "lucide-react";
const S = () => {
  const [collapse, setCollapse] = useState(false);
  const handleClick = () => {
    console.log("clicked");
    setCollapse(!collapse);
  };
  return (
    <div className="w-[250px] h-screen top-0 right-0">
      <div
        className={`w-full h-screen bg-[#042039] flex flex-col text-white rounded-tr-xl ${
          collapse ? "w-[100px]" : ""
        }`}
      >
        <div className="flex px-6 gap-6 flex-col w-full mt-[60px]">
          <div
            className={` relative align-middle justify-between items-center  pl-4   text-lg rounded-xl  flex ${
              collapse ? "w-[200px]" : ""
            }`}
          >
            <p
              className={` font-bold cursor-pointer ${
                collapse ? "hidden" : ""
              }`}
            >
              NoteWiz
            </p>
            <div className="relative">
              <button
                className={` bg-green-500 p-1.5 relative -right-8 top-[-15px]  rounded-full`}
                onClick={handleClick}
              >
                {collapse ? <ChevronLast color="white" className=""/> : <ChevronFirst color="white"/>}
              </button>
            </div>
            {/* <Image src={Plus} alt='' width={22} height={22} className='ml-7  active:text-[#011527]'></Image> */}
          </div>

          {items.map((item) => (
            <Link
              href={item.route}
              key={item.label}
              className={`flex gap-3 my-[-7px] pl-4 pr-4 hover:bg-[#011527] py-4 rounded-xl ${
                collapse ? "justify-center w-[60px] mx-[-9px]  " : ""
              }`}
            >
               {React.createElement(eval(item.src),{color:"white",size:22})}
              <p className={`text-white ${collapse ? "hidden" : " "}`}>
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default S;