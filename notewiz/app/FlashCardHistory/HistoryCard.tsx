"use client"
// import fetchFlashcardSet from "../../utils/FetchFlashCards"
import { useSession, signIn, signOut, } from "next-auth/react"
import { useState,useEffect } from "react";
import { FlashCardList } from "../flashcard/FlashCardList"
import Loading from "@/utils/Loading";

interface Props {
    topic: string;
    date: string;
    id:string
}
const HistoryCard = ({ topic, date, id }: Props) => {
    const [showFlashcards, setShowFlashcards] = useState(false);
    const [loading, setLoading] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const handleClick = async (flashcardSetId: any) => {
        setShowFlashcards(true)
        fetchData()
    }
    const fetchData = async() => {
        setLoading(true);
        const options = {
            method: "GET",
        };
            try {
                const response = await fetch(`/api/flashcard?id=${id}`, options)
                const data = await response.json();
                if (data) {
                    var formattedFlashcards = data.map((flashcard:any) => ({
                        front: flashcard.front,
                        back: flashcard.back,
                      }));
                      setFlashcards(formattedFlashcards);
                    }
                    setLoading(false);
            } catch (error) {
                console.error(error)
            }
        }
    useEffect(() => {
        // fetchData();
        setFlashcards([]);// Fetch data when component mounts
        return () => {
            // Cleanup function to reset state when component unmounts
            setFlashcards([]);
            setLoading(false);
        };
    }, [id]);
    return (
        <div className="w-full ">
             {loading ? (
        <Loading loading={loading} />
            ) : !showFlashcards ? (
            <div className="w-full flex justify-center pt-8 px-6" onClick={handleClick}>
            <div className="w-full h-full bg-[#1E1E1E] rounded-2xl hover:-translate-y-[15px] border-2 border-b-4 border-r-4 cursor-pointer border-black transition-all duration-300 hover:border-[#00E340] flex justify-between">
                <p className="text-white text-4xl font-DM_Sans tracking-tighter p-4 mt-24">{topic}</p>
                <p className="text-white text-4xl font-DM_Sans tracking-tighter p-4 mt-24">{date}</p>
            </div>
            </div>
        ) : (
            <div className="w-full flex justify-center pt-8 px-6">
            <FlashCardList flashCards={flashcards} />
            </div>
                       
        )}
             
     </div>
       
    )
}
export default HistoryCard