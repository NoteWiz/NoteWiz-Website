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
    <div className="w-[50vw] h-[50vh] rounded-lg border-2 border-[#00D93D] p-6 flex flex-col justify-between items-center shadow-lg bg-[#1e1e1e] text-white">
      <div
        className="flex flex-1 items-center justify-center text-2xl font-DM_Sans cursor-pointer transition-all duration-300 ease-in-out"
        onClick={toggleSide}
      >
        {showFront ? front : back}
      </div>
      <button
        className="mt-4 text-base rounded-xl bg-[#151515] text-white hover:bg-[#00D93D] hover:text-black cursor-pointer p-4 w-1/2 transition-all duration-300 ease-in-out"
        onClick={toggleSide}
      >
        {showFront ? "Show Back" : "Show Front"}
      </button>
    </div>
  );
};
