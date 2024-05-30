// quiz.ts

import { z } from "zod";

const commonSectionSchema = {
  questionType: z.enum(["mcq", "true_false"]),
  difficulty: z.enum(["easy", "medium", "hard"]),
  numQuestions: z.number().min(1).max(10),
};

const textSectionSchema = z.object({
  type: z.literal("text"),
  text: z
    .string()
    .min(50, { message: "Text must be at least 50 characters long" })
    .max(2000, { message: "Text must not exceed 2,000 characters!" }),
    ...commonSectionSchema,
});

const topicSectionSchema = z.object({
  type: z.literal("topic"),
  topic: z
    .string()
    .min(3, { message: "Topic must be at least 3 characters long" })
    .max(50, { message: "Topic must be at most 50 characters long" }),
    ...commonSectionSchema,
});

const fileSectionSchema = z.object({
  type: z.literal("file"),
  file: z.any().refine((value) => value instanceof File, {
    message: "Invalid file format",
  }),
  ...commonSectionSchema,
});

export const QuizCreationSchema = z.discriminatedUnion("type", [
  textSectionSchema,
  topicSectionSchema,
  fileSectionSchema,
]);

export type QuizCreationType = z.infer<typeof QuizCreationSchema>;
