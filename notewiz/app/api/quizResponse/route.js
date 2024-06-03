import prisma from "@/prisma/index";
import { SquareScissorsIcon } from "lucide-react";
import { NextResponse } from "next/server";


export const POST = async (request) => {
    const data = await request.json()
    const { userAnswers, title, filename, prompt,questionType,questions,difficulty, score,userId } = data;
    console.log(userId, title, userAnswers, prompt, questionType, questions, difficulty, score);
    try {
        const date = new Date ();
          const quizSet =await prisma.quizSet.create({
            data: {
              userId,
              createdAt: date,
            prompt,
            title,
            filename,
            score,
              difficulty,
              quizQuestions: {
                create: questions.map((question,index) => ({
                  prompt,
                  questionType,
                  question: question.question,
                  correctAnswer: question.answer,
                    options: question.options,
                    userAnswer:userAnswers[index]
                })),
              }
            }
          })
        console.log("saved");
      } catch (error) {
        console.log("not saved",error)
      }
    return NextResponse.json({ response: "data saved successfully" });
}

export const GET = async(request) => {
    const { searchParams } = new URL(request.url ?? '');
    const quizSetId = searchParams.get("quizSetId");
    console.log(quizSetId)

    const quizQuestions = await prisma.question.findMany({
        where: {
            quizSetId,
        },
    })
    console.log(quizQuestions);
    
    return NextResponse.json(quizQuestions);
}