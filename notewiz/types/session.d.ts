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
      chatbotId: string | null;
      chatbots: Chatbot|null
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
    createdAt: string;
    updatedAt: string;
    topic:     String
  }
}