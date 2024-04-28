import React from "react";
import Image from "next/image";
import Fire from "@/assets/icons/Fire.png";
import Chart from "@/assets/icons/Chart.png";
import Flash from "@/assets/icons/Flash.png";
import Game from "@/assets/icons/Game.png";

const SCard = () => {
  return (
    <div className="mt-3 mb-10 mr-24">
      <div className=" flex flex-row justify-start gap-20 ml-[455px]">
        <div className="  w-72 h-20 rounded-md bg-[#FFF67A] flex items-center ">
          <Image
            src={Fire}
            alt=""
            height={65}
            width={65}
            className="m-2 "
          />
          <div className="flex flex-col">
            <p className="text-lg">1 </p>
            <p>Day Streak</p>
          </div>
        </div>
        <div className="  w-72 h-20 rounded-md bg-[#FFF67A] flex items-center">
          <Image
            src={Flash}
            alt=""
            height={65}
            width={65}
            className="mt-2 ml-2"
          />
          <div className="flex flex-col">
            <p className="text-lg">0 </p>
            <p>Questions Solved</p>
          </div>
        </div>
      </div>
      <div className=" flex flex-row justify-start gap-20 mt-6 ml-[455px]">
        <div className=" w-72 h-20 rounded-md bg-[#FFF67A] flex items-center">
          <Image
            src={Chart}
            alt=""
            height={65}
            width={65}
            className="mt-2 ml-2"
          />
          <div className="flex flex-col ml-2">
            <p className="text-lg">0 </p>
            <p>Top Spot</p>
          </div>
        </div>
        <div className="  w-72 h-20 rounded-md bg-[#FFF67A] flex items-center">
          <Image
            src={Game}
            alt=""
            height={65}
            width={65}
            className="mt-2 ml-2"
          />
          <div className="flex flex-col ml-2">
            <p className="text-lg">0 </p>
            <p>Current League</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SCard;
