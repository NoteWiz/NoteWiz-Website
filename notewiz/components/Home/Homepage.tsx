import React from "react";
import Sidebar from "../../components/FuncSidebar/S";
import Image from "next/image";
import First from "@/assets/icons/first-cont.png";
import Second from "@/assets/icons/second-cont.png";
import Third from "@/assets/icons/third-cont.png";
import Fourth from "@/assets/icons/fourth-cont.png";
import { CircleArrowRight, ArrowUpRight } from "lucide-react";

const Homepage = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="container flex flex-col  pl-[200px]">
        <div className="first-container w-[80%] rounded-lg h-60 mt-20 border-green-500 border- ">
          <div className="first-container-fill w-full h-full rounded-2xl bg-[#6DB9FB] flex flex-row justify-between">
            <div className="text-heading mt-6 ml-3 ">
              <p className="text-1xl p-4">Welcome Back</p>
              <p className="text-3xl font-medium ml-4 border-green-500 border-2">
                Waqas Faraz
              </p>
              <p className=" text-sm font-light ml-4 border-green-500 border- mt-5 flex align-bottom hover:underline  transition-all cursor-pointer">
                Browse through previous chats{" "}
                <CircleArrowRight
                  size={17}
                  strokeWidth={1}
                  className="ml-3 align-bottom"
                />
              </p>
            </div>
            <div className="relative border-green-500 -top-16 -left-12">
              <Image
                src={First}
                alt=""
                width={340}
                height={500}
                className=" overflow-visible z-10"
              />
            </div>
          </div>
        </div>
        {/* <div className="second-parent-container"> */}
        <div className="second-container w-[40%] h-60 rounded-xl mt-3 ">
          <div className="second-container-fill w-full h-full rounded-xl bg-[#6DB9FB] flex flex-row justify-between hover:border-[#6DB9FB] border-2 before:border-none hover:bg-white transition-all">
            <div className="text-heading pl-4 pt-11  border-green-500">
              <p className="text-3xl font-medium  mt-7  flex  border-green-500 border- flex-row">
                Chat with Document
              </p>
            </div>
            <div className="relative border-green-500 top-3 left-1 right-10">
              <Image
                src={Second}
                alt=""
                width={230}
                height={220}
                className=" overflow-visible z-10"
              />
              <div>
                <ArrowUpRight size={50} className="absolute top-16 right-60" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Homepage;
