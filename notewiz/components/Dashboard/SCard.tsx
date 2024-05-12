import React from "react";
import Image from "next/image";
import Heart from "@/assets/icons/Heart.svg"
import Book from "@/assets/icons/Book.svg"
import Thumbs from "@/assets/icons/ThumbsUp.svg"
import Smiley from "@/assets/icons/Smiley.svg"

const SCard = () => {
  return (
    <div className="mt-3 mb-10 ">
      <div className=" flex flex-row justify-start gap-20 ml-[20px] max-sm:flex-col max-sm:gap-4">
        <div className="  w-72 h-20 rounded-md bg-[#00DB3D] flex items-center ">
          <Image
            src={Heart}
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
        <div className="  w-72 h-20 rounded-md bg-[#00DB3D] flex items-center">
          <Image
            src={Smiley}
            alt=""
            height={65}
            width={65}
            className="mt-2 ml-2"
          />
          <div className="flex flex-col ml-2">
            <p className="text-lg">0 </p>
            <p>Questions Solved</p>
          </div>
        </div>
      </div>
      <div className=" flex flex-row justify-start gap-20 mt-6 ml-[20px] max-sm:flex-col max-sm:gap-4">
        <div className=" w-72 h-20 rounded-md bg-[#00DB3D] flex items-center">
          <Image
            src={Thumbs}
            alt=""
            height={65}
            width={65}
            className="mt-0 ml-2"
          />
          <div className="flex flex-col ml-2">
            <p className="text-lg">0 </p>
            <p>Top Spot</p>
          </div>
        </div>
        <div className="  w-72 h-20 rounded-md bg-[#00DB3D] flex items-center">
          <Image
            src={Book}
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
