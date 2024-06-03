"use client"
import React, { useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/FuncSidebar/S";
import Loading from "@/utils/Loading";
import History from "@/components/Quiz-history/History";
import { useRouter } from "next/navigation";
interface Props {
    prompt: string;
    date: string;
    id: string;
    score: number;
    difficulty: string;
    createdAt: string;
}
const page = () => {
    const router=useRouter()
    const [loading, setLoading] = useState(true);
    const { data: session, status: sessionStatus } = useSession();
    const userId = session?.user.id
    
    if (sessionStatus === "loading") {
        return (<Loading loading={loading} />) // Show a loading state while session is being loaded
    }
  
    else if (sessionStatus === "unauthenticated") {
        router.push('/login')
        return (
            <div>Please sign in to view your account.</div>
        ) // Show a message or redirect to sign-in page
    }
    else if (sessionStatus === "authenticated") {
        const quizSets = session?.user.quizSet || [];

        if (!Array.isArray(quizSets)) {
            console.error("questions set is not an array:", quizSets);
            return null; // Handle this case appropriately
        }
        return (
            <div className="min-h-screen bg-[#252525]">
                <div className="flex">
                    <Sidebar />
                    <div className=" w-[80%] grid grid-cols-2 gap-4 m-5 max-sm:w-full max-md:grid max-md:grid-cols-1 max-sm:grid max-sm:grid-cols-1 ">
                        {quizSets.map((quizSet:Props , index: any) => (
                            <History key={index} prompt={quizSet.prompt} date={quizSet.createdAt} id={quizSet.id} score={quizSet.score} difficulty={quizSet.difficulty}/>
                        ))}
					
                    </div>
                </div>
            </div>
        );
    }
}
export default page;