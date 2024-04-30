"use client";
import { useRouter } from "next/navigation";
interface NewFlashcardProps {
  resetFlashCards: () => void;
}
export const NewFlashcard: React.FC<NewFlashcardProps> = ({
  resetFlashCards,
}) => {
  const router = useRouter();
  const handleSubmit = () => {
    resetFlashCards();
  };
  return (
    <div className="flex  items-center justify-center">
      <button
        className="rounded-lg bg-[#FFF67A] p-4 w-[70vw] text-black text-xl"
        onClick={handleSubmit}
      >
        Make new flash cards
      </button>
    </div>
  );
};
