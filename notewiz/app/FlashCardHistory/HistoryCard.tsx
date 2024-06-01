"use client"
// import fetchFlashcardSet from "../../utils/FetchFlashCards"
import { useSession, signIn, signOut, } from "next-auth/react"
import { useState,useEffect } from "react";
import { FlashCardList } from "../flashcard/FlashCardList"
import Loading from "@/utils/Loading";
import { useRouter } from "next/navigation";
import { Layers3 } from "lucide-react";

interface Props {
    topic: string;
    date: string;
    id:string
}
const HistoryCard = ({ topic, date, id }: Props) => {
    const [showFlashcards, setShowFlashcards] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const handleClick = async (flashcardSetId: any) => {
        // setShowFlashcards(true)
        // fetchData()
        router.push(`/FlashCardHistory/flashcards/${id}`);
    }
    return (
        <div
        id="FirstCard"
        className=" mt-20 max-sm:mt-0 w-full h-64 max-sm:h-[300px] max-sm:flex-col max-sm:ml-20 max-sm:w-[300px] bg-[#1E1E1E] rounded-2xl border-2 border-[#1E1E1E] hover:border-[#00E340] hover:border-2 transition-all duration-300 "
        onClick={handleClick}
        
    >
        <div className="flex flex-col justify-between items-center max-md:flex-col mt-4">
            <Layers3 color="#00E340" size={36}/>
            <p className="text-white text-4xl font-DM_Sans tracking-tighter mt-10   max-md:text-3xl  max-sm:text-4xl max-sm:mt-16">
                {topic}
            </p>
            
            <p className="text-white text-base mt-20 font-DM_Sans max-sm:mt-20">
                {date}
            </p>
        </div>
    </div>
    )
}
export default HistoryCard