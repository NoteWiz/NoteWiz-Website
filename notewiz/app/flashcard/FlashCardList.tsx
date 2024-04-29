"use client";
import { FlashCard } from "./FlashCard";
import { useState } from "react";

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
            <span className="text-white">
              {currentIndex + 1} / {flashCards.length}
            </span>
          </div>
          <div className="flex items-center justify-between w-full ">
            <button className="mr-2 text-white" onClick={handlePrevious}>
              Previous
            </button>
            <FlashCard
              key={currentIndex}
              front={flashCards[currentIndex].front}
              back={flashCards[currentIndex].back}
            />
            <button className="ml-2 text-white" onClick={handleNext}>
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No flashcards available</p>
      )}
    </div>
  );
};