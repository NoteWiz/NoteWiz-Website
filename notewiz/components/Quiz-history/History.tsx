"use client"
import React from "react";
import { Layers3 } from "lucide-react";
import { useRouter } from "next/navigation";


interface Props {
	prompt: string;
	date: string;
    id: string;
    score: number;
    difficulty:string
}
const History = ({ prompt, date, id, score, difficulty }: Props) => {
    const router = useRouter();

	const handleClick = async () => {
        // setShowFlashcards(true)
        // fetchData()
		console.log(score)
        router.push(`/quizHistory/quizQuestions/${id}?score=${score}`);
    }
	console.log(prompt)
	return (
		<div
			id="FirstCard"
			className="max-w-lg max-h-lg mt-20 max-sm:mt-0 w-full h-[48vh] lg:h-[56vh] max-sm:h-[400px] max-sm:flex-col max-sm:ml-20 max-sm:w-[300px] bg-[#1E1E1E] rounded-2xl border-2 border-[#1E1E1E] hover:border-[#00E340] hover:border-2 transition-all duration-300 hover:cursor-pointer"
		>
			<div className="flex flex-col justify-between items-center max-md:flex-col mt-4" onClick={handleClick}>
				<Layers3 color="#00E340" size={36} />
				<p className="text-white text-4xl font-DM_Sans tracking-tighter mt-8   max-md:text-3xl  max-sm:text-4xl max-sm:mt-16">
					Prompt: {prompt}
				</p>
				<div className="flex justify-between items-center  flex-col">
				<p className="text-white text-4xl font-DM_Sans tracking-tighter mt-10   max-md:text-3xl  max-sm:text-4xl max-sm:mt-16">
					Difficulty: {difficulty}
				</p>
				<p className="text-white text-4xl font-DM_Sans tracking-tighter mt-10   max-md:text-3xl  max-sm:text-4xl max-sm:mt-16">
					Score: {score}
				</p>
				</div>
				<p className="text-white text-base mt-10 font-DM_Sans max-sm:mt-20">
					{date}
				</p>
			</div>
		</div>
	);
};

export default History;
