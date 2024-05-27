"use client"
import HistoryCard from "./HistoryCard"
import { useSession } from "next-auth/react";
import Loading from "@/utils/Loading";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HistoryCardsContainer from "./HistoryCardsContainer";
export default function page() {
    const router=useRouter()
    const [loading, setLoading] = useState(true);
    const { data: session, status: sessionStatus } = useSession();
    if (sessionStatus === "loading") {
            return( <Loading loading={loading}/>) // Show a loading state while session is being loaded
      }
      
    else if (sessionStatus === "unauthenticated") {
        router.push('/login')
        return (
            <div>Please sign in to view your account.</div>
            ) // Show a message or redirect to sign-in page
    }
    else if (sessionStatus === "authenticated") {
        const flashcardSets = session?.user.flashcardSet || [];

        if (!Array.isArray(flashcardSets)) {
            console.error("Flashcard sets is not an array:", flashcardSets);
            return null; // Handle this case appropriately
        }
        
        return (
            <div className="flex flex-col justify-start overflow-auto bg-[#252525] h-screen">
               {flashcardSets.map((flashcardSet:any, index:any) => (
                   <HistoryCard key={index} topic={flashcardSet.prompt} date={flashcardSet.createdAt} id={flashcardSet.id}/>
                ))}
                 {/* <HistoryCardsContainer cards={formattedCards} /> */}
            </div>
        )
    }
}
