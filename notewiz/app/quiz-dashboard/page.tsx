"use client";
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import QuizMeCard from '@/components/QuizDash/QuizMeCard';
import HistoryCard from '@/components/QuizDash/HistoryCard';
import HotTopicsCard from '@/components/QuizDash/HotTopicsCard';
import RecentActivityCard from '@/components/QuizDash/RecentActivityCard';

type Props = {}

// export const metadata = {
//     title: "Dashboard | Quiz",
// };

const QuizDashboard = (props: Props) => {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    if (sessionStatus === "loading") {
        return <div>Loading...</div>; // Show a loading state while session is being loaded
    }
    if (sessionStatus === "unauthenticated") {
        router.replace("login");
        return <div>Please sign in to view your account.</div>; // Show a message or redirect to sign-in page
    }
    if (sessionStatus === "authenticated"){
        return (
            <main className='p-8 mx-auto max-w-7xl'>
                <div className='flex items-center'>
                    <h2 className='mr-2 text-3xl font-bold tracking-tight'>Quiz Dashboard</h2>
                </div>

                <div className='grid gap-4 mt-4 md:grid-cols-2'>
                    <QuizMeCard />
                    <HistoryCard />
                </div>

                <div className='grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7'>
                   <HotTopicsCard/> 
                   <RecentActivityCard />
                </div>

            </main>
        )
    }
    
}

export default QuizDashboard