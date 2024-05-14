import dotenv from "dotenv"
import OpenAI from "openai";
import NodeCache from "node-cache";
import { createInterface } from "readline";
import { NextResponse } from "next/server";

dotenv.config({ path: "../../.env" });
const assistantCache = new NodeCache();

const API_KEY = process.env.API_KEY;

export const POST = async (request) => {
    let myAssistant1 = assistantCache.get("myAssistant1");
    const data = await request.formData();
    let userInput = data.get("message");
    let flashcards = [];
    const secretKey = API_KEY;
    const openai = new OpenAI({
      apiKey: secretKey,
    });
  
    console.log(userInput);
  
    if (!myAssistant1) {
      myAssistant1 = await openai.beta.assistants.create({
        instructions:
          "you are a flashcard generator, that generates flashcard in the format of front and back based on the text entered by the user, the front should not be in the form of question and send the response in the form of an array of json objects with keys as front and back and not in the form of string.",
        name: "flashcard generator",
        model: "gpt-4-turbo",
      });
      assistantCache.set("myAssistant1", myAssistant1);
    } else {
      console.log("assistant already created");
    }
    let thread;
    console.log(myAssistant1);
    if (userInput) {
      thread = await openai.beta.threads.create({
        messages: [
          {
            role: "user",
            content: userInput,
          },
        ],
      });
  
      console.log("thread created", thread);
  
      const stream = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: myAssistant1.id,
        stream: true,
      });
  
      for await (const event of stream) {
        if (event.data && event.data.content) {
          // Loop through each content item (assuming each content item follows the shown structure)
          event.data.content.forEach((contentItem) => {
            if (contentItem.text && contentItem.text.value) {
              console.log(contentItem.text.value); // Log the value property
              const flashCard = JSON.parse(contentItem.text.value);
              flashcards.push(flashCard);
            }
          });
        } else {
          console.log("Waiting for more data...");
        }
      }
    } else {
      console.log("error entering if block");
    }
    const response = await openai.beta.assistants.del(myAssistant1.id);
    assistantCache.del("myAssistant1");
    console.log(response);
    return NextResponse.json(flashcards);
}