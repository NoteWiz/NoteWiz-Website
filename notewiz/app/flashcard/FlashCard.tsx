"use client";

import { useState } from "react";
interface FlashCardProps {
  front: string;
  back: string;
}

export const FlashCard: React.FC<FlashCardProps> = ({ front, back }) => {
  const [showFront, setShowFront] = useState(true);
  const toggleSide = () => {
    setShowFront(!showFront);
  };
  return (
    <div className="w-[50vw] h-[50vh] rounded-lg border-solid border-2 border-[#ccc] p-4 flex flex-col justify-between shadow bg-[#fffab3] ">
      <div
        className="flex flex-1 items-center justify-center text-2xl cursor-pointer"
        onClick={toggleSide}
      >
        {showFront ? front : back}
      </div>
      <button
        className="mt-4 text-base rounded-lg bg-[#80C4FF] text-black cursor-pointer p-2 pr-[16px] border-0"
        onClick={toggleSide}
      >
        {showFront ? "Show Back" : "Show Front"}
      </button>
    </div>
  );
};
