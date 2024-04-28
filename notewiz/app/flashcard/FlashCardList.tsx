import { FlashCard } from "./FlashCard";

interface FlashCardData {
  front: string;
  back: string;
}

interface FlashCardListProps {
  flashCards: FlashCardData[];
}

export const FlashCardList: React.FC<FlashCardListProps> = ({ flashCards }) => {
  return (
    <div className="flex flex-wrap justify-center p-5 bg-gray-200 rounded-lg gap-[20px] overflow-auto h-[70vh]">
      {Array.isArray(flashCards) && flashCards.length > 0 ? (
        flashCards.map((card, index) => (
          <FlashCard key={index} front={card.front} back={card.back} />
        ))
      ) : (
        <p>No flashcards available</p>
      )}
    </div>
  );
};
