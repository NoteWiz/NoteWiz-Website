//api/game/route.ts
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "../../api/auth/[...nextauth]/route";
import { QuizCreationSchema, QuizCreationType } from "@/lib/schemas/forms/quiz";
import { NextResponse } from "next/server";
import { z } from "zod";
import axios from 'axios';
import { fileURLToPath } from "url";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a game." },
        { status: 401 }
      );
    }

    const body: QuizCreationType = QuizCreationSchema.parse(await req.json());
    const { type, questionType, numQuestions, difficulty } = body;
    let text: string | undefined;
    let topic: string | undefined;
    let file: File | undefined;
    if (type === "text") {
      text = body.text;
    } else if (type === "topic") {
      topic = body.topic;
    } else if (type === "file") {
      file = body.file;
    }

    console.log({ type, questionType, numQuestions, difficulty, text, topic, file });

    const game = await prisma.game.create({
      data: {
        gameType: questionType,
        timeStarted: new Date(),
        userId: session.user.id,
        topic: topic ?? "",
        text: text ?? "",
        file_url: file ? file.name : "",
      },
    });

    const { data } = await axios.post(
      `${process.env.NEXTAUTH_URL as string}/api/questions`,
      {
        numQuestions,
        difficulty,
        questionType,
        text,
        topic,
        file,
      }
    );

    if (questionType === "mcq") {
      type mcqQuestion = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
        option3: string;
        option4: string;
      };

      const manyData = data.questions.map((question: mcqQuestion) => {
        // mix up the options lol
        const options = [
          question.option1,
          question.option2,
          question.option3,
          question.option4,
          question.answer,
        ].sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: "mcq",
        };
      });

      await prisma.question.createMany({
        data: manyData,
      });
    } else if (questionType === "true_false") {
      type true_falseQuestion = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
      };

      const manyData = data.questions.map((question: true_falseQuestion) => {
        // mix up the options lol
        const options = [
          question.option1,
          question.option2,
          question.answer,
        ].sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: "true_false",
        };
      });

      await prisma.question.createMany({
        data: manyData,
      });
    }

    return NextResponse.json({ gameId: game.id }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
}
