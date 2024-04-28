"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { InputField } from "./inputField";
import { useState } from "react";
import { FlashCardList } from "./FlashCardList";
import { NewFlashcard } from "./NewFlashcard";

export default function page() {
  const [flashCards, setFlashCards] = useState([]);
  const resetFlashCards = () => {
    setFlashCards([]);
  };
  return (
    <div className="bg-black h-screen w-screen flex flex-col">
      <div className="flex-none">
        <h1 className="text-white flex justify-center text-5xl">
          Flash card Generator
        </h1>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {flashCards.length === 0 ? (
          <InputField setFlashCards={setFlashCards} />
        ) : (
          <div className="flex flex-col gap-4">
            <FlashCardList flashCards={flashCards} />
            <NewFlashcard resetFlashCards={resetFlashCards} />
          </div>
        )}
      </div>
    </div>
  );
}
