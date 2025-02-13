import React from "react";
import Image from "next/image";
import Chat from "@/assets/icons/Message.svg";
import Rocket from "@/assets/icons/Rocket.svg";
import YChat from "@/assets/icons/YellowChat.svg";
import Star from "@/assets/icons/Star.svg";
import Info from "@/assets/icons/Info.svg"

const ACard = () => {
  return (
    <div className="flex justify-start flex-col ml-[20px]">
      <div className="w-full h-24 my-2  rounded-md bg-[#00DB3D] flex items-center">
        <Image src={Chat} alt="" width={65} height={65} className="m-4" />
        <div className="flex flex-col items-start w-full">
          <p className="text-xl font-semibold ml-5">WildFire</p>
          <div className="progress-bar w-[80%] ml-4 h-5 bg-[#02942B] rounded-xl">
            <div className="progress-bar-fill w-[50%] h-5 bg-[#1E1E1E] rounded-xl"></div>
          </div>
          <p className="text-sm ml-4">Acheived a streak</p>
        </div>
        <div className="relative -top-8 -left-2">1/3</div>
      </div>
      <div className=" second w-full h-24 my-2  rounded-md bg-[#00DB3D] flex items-center">
        <Image src={Rocket} alt="" width={65} height={65} className="m-4" />
        <div className="flex flex-col items-start w-full">
          <p className="text-xl font-semibold ml-5">WildFire</p>
          <div className="progress-bar w-[80%] ml-4 h-5 bg-[#02942B] rounded-xl">
            <div className="progress-bar-fill w-[50%] h-5 bg-[#1E1E1E] rounded-xl"></div>
          </div>
          <p className="text-sm ml-4">Acheived a streak</p>
        </div>
        <div className="relative -top-8 -left-2">1/3</div>
      </div>
      <div className=" third w-full h-24 my-2  rounded-md bg-[#00DB3D] flex items-center">
        <Image src={Star} alt="" width={65} height={65} className="m-4" />
        <div className="flex flex-col items-start w-full">
          <p className="text-xl font-semibold ml-5">WildFire</p>
          <div className="progress-bar w-[80%] ml-4 h-5 bg-[#02942B] rounded-xl">
            <div className="progress-bar-fill w-[50%] h-5 bg-[#1E1E1E] rounded-xl"></div>
          </div>
          <p className="text-sm ml-4">Acheived a streak</p>
        </div>
        <div className="relative -top-8 -left-2">1/3</div>
      </div>
      <div className=" fourth w-full h-24 my-2  rounded-md bg-[#00DB3D] flex items-center">
        <Image src={Info} alt="" width={65} height={65} className="m-4" />
        <div className="flex flex-col items-start w-full">
          <p className="text-xl font-semibold ml-5">WildFire</p>
          <div className="progress-bar w-[80%] ml-4 h-5 bg-[#02942B] rounded-xl">
            <div className="progress-bar-fill w-[50%] h-5 bg-[#1E1E1E] rounded-xl"></div>
          </div>
          <p className="text-sm ml-4">Acheived a streak</p>
        </div>
        <div className="relative -top-8 -left-2">1/3</div>
      </div>
    </div>
  );
};

export default ACard;
