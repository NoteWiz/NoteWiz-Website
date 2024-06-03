"use client";
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FlashCardList } from '@/app/flashcard/FlashCardList';
import Loading from '@/utils/Loading';
import { useRouter, useSearchParams } from 'next/navigation';

export default function page({params}:any) {
    const router = useRouter();
    const quizSetId = params.id
    console.log(quizSetId);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            // <Loading loading={loading}/>
            const options = {
                method: "GET",
            };
                try {
                    const response = await fetch(`/api/quizResponse?quizSetId=${quizSetId}`, options)
                    const data = await response.json();
                    console.log(data)
                } catch (error) {
                    console.error(error)
                }
            }

        if (quizSetId) {
            fetchData();
        }
    }, [quizSetId]);

    return (
        <div className="w-full flex justify-center bg-[#252525] h-screen overflow-hidden">
            {/* {loading ? (
                <Loading loading={loading} />
            ) : (
                <FlashCardList flashCards={flashcards} />
            )} */}
        </div>
    );
};

// export default FlashcardsPage;
