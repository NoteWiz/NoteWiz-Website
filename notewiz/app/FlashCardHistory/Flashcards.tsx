"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { InputField } from "./inputField";
import { useState } from "react";
import { FlashCardList } from "../flashcard/FlashCardList";
import { NewFlashcard } from "../flashcard/NewFlashcard";
import { InputField } from "../flashcard/inputField";
import S from "@/components/FuncSidebar/S";

export default function page() {
  const [flashCards, setFlashCards] = useState([]);
  const resetFlashCards = () => {
    setFlashCards([]);
  };
  return (
    <div className="flex h-screen">
      <div className="flex-none">
        <S />
      </div>
      <div className="flex-1 bg-[#80C4FF]  flex flex-col pl-[250px]">
        <div className="flex-none">
          <p className="text-black pt-8 flex justify-center text-5xl ">
            Flash Card Generator
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center overflow-auto">
        {flashCards.length === 0 ? (
            <InputField setFlashCards={setFlashCards} />
          ) : (
            <div className="flex flex-col gap-4 w-full">
              <FlashCardList flashCards={flashCards} />
              <NewFlashcard resetFlashCards={resetFlashCards} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
