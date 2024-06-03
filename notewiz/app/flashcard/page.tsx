"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { InputField } from "./inputField";
import { useState } from "react";
import { FlashCardList } from "./FlashCardList";
import { NewFlashcard } from "./NewFlashcard";
import S from "@/components/FuncSidebar/S";
import { Zap } from 'lucide-react';

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
      <div className="flex-1 bg-[#252525]  flex flex-col pl-[0px]">
        <div className="flex-none">
          <p className="text-white font-DM_Sans tracking-tight pt-16 flex justify-center text-5xl ">
          <Zap className="z-10 mr-2" />Flash Card Generator <Zap className="z-10 ml-3" />
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center overflow-auto ">
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
