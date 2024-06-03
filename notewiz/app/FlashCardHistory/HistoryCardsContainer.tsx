'use client'
import { useState } from "react";
import HistoryCard from "./HistoryCard";

interface Props {
    topic: string;
    date: string;
    id: string;
}
const HistoryCardsContainer = ({ cards }: { cards: Props[] }) => {
    const [activeCard, setActiveCard] = useState<Props | null>(null);

    const handleCardClick = (card: Props) => {
        setActiveCard(card);
    };

    return activeCard ? (
        <HistoryCard {...activeCard} />
    ) : (
        <div className="w-full flex flex-col items-center">
            {cards.map((card) => (
                <div
                    key={card.id}
                    className="w-full flex justify-center pt-8 px-6"
                    onClick={() => handleCardClick(card)}
                >
                    <div className="w-full h-full bg-[#1E1E1E] rounded-2xl hover:-translate-y-[15px] border-2 border-b-4 border-r-4 cursor-pointer border-black transition-all duration-300 hover:border-[#00E340] flex justify-between">
                        <p className="text-white text-4xl font-DM_Sans tracking-tighter p-4 mt-24">{card.topic}</p>
                        <p className="text-white text-4xl font-DM_Sans tracking-tighter p-4 mt-24">{card.date}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HistoryCardsContainer;