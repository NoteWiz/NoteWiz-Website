"use client";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { CopyCheck, Upload, List, PencilLine, AlignCenter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { QuizCreationSchema, QuizCreationType } from "@/lib/schemas/forms/quiz";
import QuizPlay from "@/app/QuizPlay/QuizPlay";
import S from "../FuncSidebar/S";
import { PrismaClient } from "@prisma/client";

type QuestionType = {
	question: string;
	answer: string;
	options: {
		option1: string;
		option2: string;
		option3: string;
		option4: string;
	}
};

type Props = {
	inputType: "text" | "topic" | "file";
	topic?: string;
	text?: string;
	file?: File;
};

const QuizFormCreate = (props: Props) => {
	const { data: session, status: sessionStatus } = useSession();	
	const [prompt, setPrompt] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [filename, setFilename]= useState<string>('');
	const [difficulty,setDifficulty]=useState<string>('');
	const [generatedQuestions, setGeneratedQuestions] = useState<
		QuestionType[]
	>([]);
	const [selectedQuestionType, setSelectedQuestionType] = useState("");
	const [quizSetId,setQuizSetId]=useState("")
	const [inputType, setInputType] = useState<"text" | "topic" | "file">(
		props.inputType
	);

	const form = useForm<QuizCreationType>({
		// @ts-ignore

		resolver: zodResolver(QuizCreationSchema),
		defaultValues: {
			type: inputType,
			text: props.text || "",
			topic: props.topic || "",
			file: props.file || null,
			questionType: "mcq",
			difficulty: "easy",
			numQuestions: 2
		} as QuizCreationType
	});

	useEffect(() => {
		form.reset({
			type: inputType,
			text: props.text || "",
			topic: props.topic || "",
			file: props.file || null,
			questionType: "mcq",
			difficulty: "easy",
			numQuestions: 2
		} as QuizCreationType);
	}, [inputType, props.text, props.topic, props.file, form]);

	const onSubmit = async (data: QuizCreationType) => {
		// Handle form submission here
		const formData = new FormData();
		formData.append("session",JSON.stringify(session))
		formData.append("type", data.type);
		formData.append("questionType", data.questionType);
		formData.append("difficulty", data.difficulty);
		setDifficulty(data.difficulty)
		formData.append("numQuestions", String(Number(data.numQuestions)));
		if (data.type === "text") {
			formData.append("text", data.text);
			setPrompt(data.text);
		} else if (data.type === "topic") {
			formData.append("topic", data.topic);
			setPrompt(data.topic);
		} else if (data.type === "file") {
			formData.append("file", data.file as Blob);
			setPrompt("")
		}

		try {
			const response = await fetch("/api/questions", {
				method: "POST",
				body: formData
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const result = await response.json();
			setGeneratedQuestions(result.quizQuestions[0]);
			setSelectedQuestionType(result.questionType);
			setQuizSetId(result.quizSetId)
			setFilename(result.filename);
			setTitle(result.title);

		} catch (error) {
			console.error(
				"Error generating questions or saving to the database:",
				error
			);
		}
	};

	return generatedQuestions.length === 0 ? (
		// @ts-ignore

		<div className="flex ">
			<S />
			<div className="absolute -translate-x-[30%] -translate-y-1/2 top-1/2 left-1/2 w-[40%] max-sm:w-2/3 max-sm:-translate-x-[50%] max-md:w-3/5  ">
				<Card className="w-full border-2 border-[#00D93D] bg-black text-white">
					<CardHeader className="py-2">
						<CardTitle className="text-2xl font-bold">
							Quiz Creation
						</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent>
						{
							// @ts-ignore

							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-6 max-sm:space-y-1 max-md:space-y-0 max-lg:space-y-0"
								>
									<div className="flex justify-center p-0">
										<Button
											variant={
												inputType === "text"
													? "default"
													: "secondary"
											}
											className="w-1/3 rounded-none rounded-l-lg border-2 border-[#252525]"
											onClick={() => setInputType("text")}
											type="button"
										>
											<AlignCenter className="w-4 h-4 mr-2" />{" "}
											Text
										</Button>
										<Separator orientation="vertical" />
										<Button
											variant={
												inputType === "topic"
													? "default"
													: "secondary"
											}
											className="w-1/3 rounded-none border-y-2 border-[#252525]"
											onClick={() =>
												setInputType("topic")
											}
											type="button"
										>
											<PencilLine className="w-4 h-4 mr-2" />{" "}
											Topic
										</Button>
										<Separator orientation="vertical" />
										<Button
											variant={
												inputType === "file"
													? "default"
													: "secondary"
											}
											className="w-1/3 rounded-none rounded-r-lg border-2 border-[#252525]"
											onClick={() => setInputType("file")}
											type="button"
										>
											<Upload className="w-4 h-4 mr-2" />{" "}
											Upload
										</Button>
									</div>

									{inputType === "text" && (
										<FormField
											control={form.control}
											name="text"
											render={({ field }) => (
												<FormItem className="">
													<FormLabel>Text</FormLabel>
													<FormControl>
														<Input
															className="text-black"
															placeholder="Enter your text"
															{...field}
															maxLength={2000}
														/>
													</FormControl>
													<FormDescription>
														Enter your text here
														(maximum 2,000
														characters)
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}

									{inputType === "topic" && (
										<FormField
											control={form.control}
											name="topic"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Topic</FormLabel>
													<FormControl>
														<Input
															className="text-black"
															placeholder="Enter a topic"
															{...field}
														/>
													</FormControl>
													<FormDescription>
														Please provide any topic
														you would like to be
														quizzed on here.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}

									{inputType === "file" && (
										<FormField
											control={form.control}
											name="file"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Upload File
													</FormLabel>
													<FormControl>
														<Input
															className="text-gray-600"
															type="file"
															onChange={(e) => {
																const file = e
																	.target
																	.files
																	? e.target
																			.files[0]
																	: null;
																if (file) {
																	form.setValue(
																		"file",
																		file
																	);
																}
															}}
														/>
													</FormControl>
													<FormDescription>
														Upload a file here
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}

									<FormField
										control={form.control}
										name="questionType"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Question Type
												</FormLabel>
												<FormControl>
													<div className="flex justify-between">
														<Button
															variant={
																form.getValues(
																	"questionType"
																) === "mcq"
																	? "default"
																	: "secondary"
															}
															className="w-1/2 rounded-none rounded-l-lg border-2 border-[#252525] border-r-0"
															onClick={() =>
																form.setValue(
																	"questionType",
																	"mcq"
																)
															}
															type="button"
														>
															<List className="w-4 h-4 mr-2" />{" "}
															Multiple Choice
														</Button>
														<Separator orientation="vertical" />
														<Button
															variant={
																form.getValues(
																	"questionType"
																) ===
																"true_false"
																	? "default"
																	: "secondary"
															}
															className="w-1/2 rounded-none rounded-r-lg border-l-0 border-y-2 border-r-2 border-[#252525]"
															onClick={() =>
																form.setValue(
																	"questionType",
																	"true_false"
																)
															}
															type="button"
														>
															<CopyCheck className="w-4 h-4 mr-2" />{" "}
															True/False
														</Button>
													</div>
												</FormControl>
												<FormDescription>
													Choose the type of questions
													you want
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="difficulty"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Difficulty
												</FormLabel>
												<FormControl>
													<select
														{...field}
														className="border border-gray-300 text-black rounded-md p-2 w-full"
													>
														<option value="easy">
															Easy
														</option>
														<option value="medium">
															Medium
														</option>
														<option value="hard">
															Hard
														</option>
													</select>
												</FormControl>
												<FormDescription>
													Choose the difficulty level
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="numQuestions"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Number of Questions
												</FormLabel>
												<FormControl>
													<Input
														placeholder="How many questions?"
														type="number"
														{...field}
														min={1}
														max={10}
														className="text-black"
													/>
												</FormControl>
												<FormDescription>
													You can choose how many
													questions you would like to
													be quizzed on here.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button
										type="submit"
										className=" hover:text-black hover:bg-[##00D93D]"
									>
										Submit
									</Button>
								</form>
							</Form>
						}
					</CardContent>
				</Card>
			</div>
		</div>
	) : (
		<QuizPlay
			prompt={prompt}
			filename={filename}
			title={title}
			difficulty={difficulty}	
			questions={generatedQuestions}
			questionType={selectedQuestionType}
		/>
	);
};

export default QuizFormCreate;
