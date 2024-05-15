import React from "react";
// import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import QuizFormCreation from "@/components/QuizForm/QuizFormCreate";

export const metadata = {
  title: "Quiz | Quizzzy",
  description: "Quiz yourself on anything!",
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
  
    const inputType = searchParams.inputType || (searchParams.topic ? "topic" : searchParams.text ? "text" : searchParams.file ? "file": "text");
  
    return (
      <QuizFormCreation
        inputType={inputType}
        topic={searchParams.topic}
        text={searchParams.text}
        file={searchParams.file}
      />
    );
  };

export default QuizForm;