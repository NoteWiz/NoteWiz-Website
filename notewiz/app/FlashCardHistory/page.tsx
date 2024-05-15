"use client"
import HistoryCard from "./HistoryCard"
import { useSession } from "next-auth/react";
import Loading from "@/utils/Loading";
import { useState } from "react";
export default function page() {
    const [loading, setLoading] = useState(true);
    const { data: session, status: sessionStatus } = useSession();
    const flashcardSets = session?.user.flashcardSet || [];
    if (!Array.isArray(flashcardSets)) {
        return null; // or handle the case where flashcardSets is not an array
    }
    if (sessionStatus === "loading") {
            return( <Loading loading={loading}/>) // Show a loading state while session is being loaded
      }
      
    else if (sessionStatus === "unauthenticated") {
        return <div>Please sign in to view your account.</div>; // Show a message or redirect to sign-in page
    }
    else if (sessionStatus === "authenticated") {
        
        return (
            <div className="flex flex-col items-center justify-center overflow-auto">
               {flashcardSets.map((flashcardSet:any, index:any) => (
                   <HistoryCard key={index} topic={flashcardSet.prompt} date={flashcardSet.createdAt} id={flashcardSet.id}/>
                ))}
                
            </div>
        )
    }
}
