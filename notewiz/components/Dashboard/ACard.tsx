import React from "react";
import Image from "next/image";
import Crown from "@/assets/icons/Crown.png";
const ACard = () => {
  return (
    <div className="flex justify-start ml-[455px]  w-[43%]">
      <div className="w-full h-24 my-2  rounded-md bg-[#FFF67A] flex items-center">
        <Image src={Crown} alt="" width={65} height={65} className="m-4" />
        <div className="flex flex-col items-start w-full">
          <p className="text-xl font-semibold ml-5">WildFire</p>
          <div className="progress-bar w-[80%] ml-4 h-5 bg-[#FFC700] rounded-xl">
            <div className="progress-bar-fill w-[50%] h-5 bg-[#7A83FF] rounded-xl"></div>
          </div>
          <p className="text-sm ml-4">Acheived a streak</p>
        </div>
        <div className="relative -top-8 -left-2">1/3</div>
      </div>
    </div>
  );
};

export default ACard;
