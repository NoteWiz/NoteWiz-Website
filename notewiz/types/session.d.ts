import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
      accessToken: string;
      flashcardSet: FlashcardSet | null;
      chatbotId:string|null
      chatbots: Chatbot[] | null;
      quizSet:QuizSet|null
      quizSetId:string|null
    };
  }

  interface FlashcardSet {
    id: string;
    userId: string;
    prompt: string;
    createdAt: string;
  }

  interface Chatbot{
    id: string;
    userId: string;
    threadId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }
  interface QuizSet {
    id:            string   
    userId:        string
    prompt:        string
    createdAt:     Date
  }
}