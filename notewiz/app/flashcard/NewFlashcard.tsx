"use client";
import { useRouter } from "next/navigation";
import { SquarePlus } from 'lucide-react';
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
    <div className="flex items-center justify-center">
      <button
        className="flex items-center justify-center gap-2 rounded-xl bg-[#00D93D] text-black hover:bg-[#181818] hover:text-white p-4 px-2 w-1/12 text-xl transition duration-300 ease-in-out"
        onClick={handleSubmit}
      >
        <SquarePlus className="w-6 h-6" />
      </button>
    </div>
  );
};
