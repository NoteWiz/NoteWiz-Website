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
    <div className="flex bg-white rounded-xl items-center">
      <button className="rounded-lg p-4 w-full" onClick={handleSubmit}>
        Make new flash cards.
      </button>
    </div>
  );
};
