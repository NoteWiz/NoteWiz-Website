import React from "react";
import { redirect } from "next/navigation";
import QuizFormCreation from "@/components/QuizForm/QuizFormCreate";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Quiz",
	description: "Quiz yourself on anything!"
};

interface Props {
	searchParams: {
		topic?: string;
		text?: string;
		file?: File;
		inputType?: "text" | "topic" | "file";
	};
}

const QuizForm = async ({ searchParams }: Props) => {
	// const session = await getAuthSession();
	// if (!session?.user) {
	//   redirect("/login");
	// }

	const inputType =
		searchParams.inputType ||
		(searchParams.topic
			? "topic"
			: searchParams.text
				? "text"
				: searchParams.file
					? "file"
					: "text");

	return (
		<div className="bg-[#252525] w-full h-screen">
			<div className="absolute left-4 top-4 cursor-pointer z-0">
				<Link href="/quiz-dashboard">
					<CircleArrowLeft
						size={50}
						className="absolute left-0"
						color="#00E340"
					/>
				</Link>
			</div>

			<QuizFormCreation
				inputType={inputType}
				topic={searchParams.topic}
				text={searchParams.text}
				file={searchParams.file}
			/>
		</div>
	);
};

export default QuizForm;
