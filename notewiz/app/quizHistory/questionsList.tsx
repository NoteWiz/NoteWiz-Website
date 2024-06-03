"use client";
import React from "react";
import { useSession } from "next-auth/react";
import S from "@/components/FuncSidebar/S";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";

type Options = {
	option1: string;
	option2: string;
	option3?: string; // optional for true/false
	option4?: string; // optional for true/false
};

type Question = {
	question: string;
	correctAnswer: string;
	options: Options;
	userAnswer: string;
	questionType: string;
};

type Props = {
	questions: Question[];
	score: string | null;
};

const QuestionsList = ({ questions, score }: Props) => {
	const { data: session, status: sessionStatus } = useSession();
	const numericScore = score ? Number(score) : 0;

	return (
		<div className="w-screen text-white overflow-y-scroll">
			<div className="flex flex-row">
				<S />
				<div className="w-full md:w-[80%] mx-auto px-4">
					<div className="mt-4 w-full bg-[#181818] p-6 rounded-lg shadow-lg">
						<h2 className="text-2xl font-semibold mb-4 text-center">Quiz Results</h2>
						<div className="overflow-x-auto">
							<Table className="mt-4 w-full">
								<TableCaption className="text-lg font-semibold">Your Performance Summary</TableCaption>
								<TableHeader>
									<TableRow className="text-xl tracking-tighter bg-[#252525]">
										<TableHead className="w-[10px] text-white">No.</TableHead>
										<TableHead className="text-white">Question</TableHead>
										<TableHead className="w-[200px] text-white">Options</TableHead>
										<TableHead className="text-white">Correct Answer</TableHead>
										<TableHead className="text-white">Your Answer</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody className="text-white text-lg">
									{questions.map(
										(
											{
												question,
												userAnswer,
												correctAnswer,
												options,
												questionType
											},
											index
										) => (
											<TableRow key={index} className="bg-[#181818] hover:bg-[#252525]">
												<TableCell className="font-medium">{index + 1}</TableCell>
												<TableCell>{question}</TableCell>
												<TableCell>
													{questionType === "true_false" ? (
														<>
															<p>(a) {options.option1}</p>
															<p>(b) {options.option2}</p>
														</>
													) : (
														<>
															<p>(a) {options.option1}</p>
															<p>(b) {options.option2}</p>
															<p>(c) {options.option3}</p>
															<p>(d) {options.option4}</p>
														</>
													)}
												</TableCell>
												<TableCell className="text-green-400">{correctAnswer}</TableCell>
												<TableCell className={userAnswer === correctAnswer ? 'text-green-500' : 'text-red-500'}>
													{userAnswer}
												</TableCell>
											</TableRow>
										)
									)}
								</TableBody>
							</Table>
						</div>
						<div className="text-center mt-8">
							<p className="text-xl">Total Questions: <span className="font-bold">{questions.length}</span></p>
							<p className="text-xl">Accuracy: <span className='text-[#00D93D]'>{((numericScore / questions.length) * 100).toFixed(1)}</span>%</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionsList;
