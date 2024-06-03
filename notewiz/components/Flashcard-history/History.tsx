"use client"
import React from "react";
import { Layers3 } from "lucide-react";
import { useRouter } from "next/navigation";


interface Props {
	topic: string;
	date: string;
	id: string;
}
const History = ({ topic, date, id }: Props) => {
    const router = useRouter();

	const handleClick = async (flashcardSetId: any) => {
        // setShowFlashcards(true)
        // fetchData()
        router.push(`/flashcard-history/flashcards/${id}`);
    }
	console.log(topic)
	return (
		<div
			id="FirstCard"
			className=" mt-20 max-sm:mt-0 w-full h-64 max-sm:h-[300px] max-sm:flex-col max-sm:ml-20 max-sm:w-[300px] bg-[#1E1E1E] rounded-2xl border-2 border-[#1E1E1E] hover:border-[#00E340] hover:border-2 transition-all duration-300"
		>
			<div className="flex flex-col justify-between items-center max-md:flex-col mt-4" onClick={handleClick}>
				<Layers3 color="#00E340" size={36} />
				<p className="text-white text-4xl font-DM_Sans tracking-tighter mt-10   max-md:text-3xl  max-sm:text-4xl max-sm:mt-16">
					{topic}
				</p>
				<p className="text-white text-base mt-20 font-DM_Sans max-sm:mt-20">
					{date}
				</p>
			</div>
		</div>
	);
};

export default History;
