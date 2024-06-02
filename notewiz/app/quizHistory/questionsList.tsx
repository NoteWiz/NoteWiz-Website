"use client";
import React from "react";
import { useSession } from "next-auth/react";


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Options = {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
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
  // const score = session?.user.quizSet
  return (
    <Table className="mt-4">
      <TableCaption>End of list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">No.</TableHead>
          <TableHead>Question</TableHead>
          <TableHead>Options</TableHead>
          <TableHead>Correct Answer</TableHead>
          <TableHead>Your Answer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map(
          ({ question, userAnswer, correctAnswer, options, questionType }, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{question}</TableCell>
              <TableCell>
                {options.option1}
                <br />
                {options.option2}
                <br />
                {options.option3}
                <br />
                {options.option4}
              </TableCell>
              <TableCell>{correctAnswer}</TableCell>
              <TableCell>{userAnswer}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
      <p>Total Score: {score}</p>
    </Table>
  );
};

export default QuestionsList;
