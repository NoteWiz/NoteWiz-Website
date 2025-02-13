"use client";
import { useEffect, useState } from 'react';
import Loading from '../../../../utils/Loading';
import { useRouter, useSearchParams } from 'next/navigation';
import QuestionsList from '../../questionsList';

export default function page({params}:any) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const score = searchParams.get('score');
    console.log(score);
    const quizSetId = params.id
    console.log(quizSetId);
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            const options = {
                method: "GET",
            };
                try {
                    const response = await fetch(`/api/quizResponse?quizSetId=${quizSetId}`, options)
                    var questions = await response.json();
                    setQuestions(questions);
                    setLoading(false);
                    console.log(questions)
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
            {loading ? (
                <Loading loading={loading} />
            ) : (
                <QuestionsList questions={questions} score={score} />
            )}
        </div>
    );
};

