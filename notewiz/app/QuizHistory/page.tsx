'use client';
import React, { useState } from "react";
import QuizHistoryComponent from "@/components/QuizHistoryComponent/QuizHistoryComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { LucideLayoutDashboard } from "lucide-react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from '@/utils/Loading';

type Props = {}

const QuizHistory = (props: Props) => {
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
        return (
            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[400px]">
            <Card>
                <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">History</CardTitle>
                    <Link className={buttonVariants()} href="/home">
                    <LucideLayoutDashboard className="mr-2" />
                    Back to Dashboard
                    </Link>
                </div>
                </CardHeader>
                <CardContent className="max-h-[60vh] overflow-scroll">
                <QuizHistoryComponent limit={100} userId={session.user.id} />
                </CardContent>
            </Card>
            </div>
        );
    };
};

export default QuizHistory

// When we click on view history card on quiz dashboard, 
// we are directed to /quizHistory , where we see this page of all links of attempted quizes stored in QuizHistoryComponent.
// when we click on any old attempted quiz link, we should be directed to ViewOldQuiz page, where we define the the QuestionsList component, that displays all questions

// under app: folder-1 is QuizHistory where we call QuizHistoryComponent, which is in components folder
// under app: folder-2 is ViewOldQuiz where we see details of the quiz attemot by calling QuestionsList component 