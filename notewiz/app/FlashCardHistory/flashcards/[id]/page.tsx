"use client";
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FlashCardList } from '@/app/flashcard/FlashCardList';
import Loading from '@/utils/Loading';
import { useRouter, useSearchParams } from 'next/navigation';

export default function page({params}:any) {
    const router = useRouter();
    // const { id } = router.searchParams;
     // Get the id from the query parameters
    const searchParams = useSearchParams();
    const id = params.id
    console.log(id);
    const [loading, setLoading] = useState(false);
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            // <Loading loading={loading}/>
            const options = {
                method: "GET",
            };
                try {
                    const response = await fetch(`/api/flashcard?id=${id}`, options)
                    const data = await response.json();
                    console.log(data)
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

        if (id) {
            fetchData();
        }
    }, [id]);

    return (
        <div className="w-full flex justify-center bg-[#252525] h-screen overflow-hidden">
            {loading ? (
                <Loading loading={loading} />
            ) : (
                <FlashCardList flashCards={flashcards} />
            )}
        </div>
    );
};

// export default FlashcardsPage;
