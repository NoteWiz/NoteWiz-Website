"use client";
import { FlashCard } from "./FlashCard";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

interface FlashCardData {
  front: string;
  back: string;
}

interface FlashCardListProps {
  flashCards: FlashCardData[];
}

export const FlashCardList: React.FC<FlashCardListProps> = ({ flashCards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashCards.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === flashCards.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-wrap justify-center p-5  rounded-lg gap-[20px] overflow-auto h-[70vh]">
      {Array.isArray(flashCards) && flashCards.length > 0 ? (
        <>
          <div className="flex items-center justify-center w-full mb-4">
            <span className="text-[#00D93D] text-lg pb-12">
              {currentIndex + 1} <span className="text-white">/ </span>{flashCards.length}
            </span>
          </div>
          <div className="flex items-center justify-around w-full">
            <button
              className="ml-2 text-white rounded-full bg-[#151515] p-6 hover:bg-[#00D93D] hover:text-black"
              onClick={handlePrevious}
            >
              <FaArrowLeft size={20} />
            </button>
            <FlashCard
              key={currentIndex}
              front={flashCards[currentIndex].front}
              back={flashCards[currentIndex].back}
            />
            <button
              className="ml-2 text-white rounded-full bg-[#151515] p-6 hover:bg-[#00D93D] hover:text-black"
              onClick={handleNext}
            >
              <FaArrowRight size={20} />
            </button>
          </div>
        </>
      ) : (
        <p>No flashcards available</p>
      )}
    </div>
  );
};
