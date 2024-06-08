import dotenv from "dotenv"
import OpenAI from "openai";
import NodeCache from "node-cache";
import { createInterface } from "readline";
import { NextResponse } from "next/server";
import prisma from "@/prisma";


const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

dotenv.config({ path: "../../.env" });
const assistantCache = new NodeCache();

const API_KEY = process.env.API_KEY;
function cleanResponseText(text) {
  return text.replace(/【\d+:\d+†.*】/g, "");
}
// const assistantHistory = [];
const contextHistory = [];  // History for context in OpenAI assistant

const messageHistory = [];  // History

export const POST = async (request) => {

  const data = await request.formData();
  let isNewChat = data.get("isNewChat") === "true";
  let NewFile = data.get('file');
  console.log(data.get("file"));
  let myAssistant1 = assistantCache.get("myAssistant");
  let userInput = data.get("message");
  let title = data.get("title")
  console.log(title)
  let session = JSON.parse(data.get("session"))
  let userId = session.user.id
  let threadId = data.get("threadId");
  // let chatbotId = session.user.chatbots[0]?.id;
  // console.log(chatbotId)
    console.log(userId)
    var content=""
  // assistantHistory.push({ title:title, role: "user", content: userInput });
  contextHistory.push({ title, role: "user", content: userInput });

  if (!messageHistory.some(message => message.content === userInput && message.role === "user")) {
    messageHistory.push({ title, role: "user", content: userInput });
  }


  const secretKey = API_KEY;
  const openai = new OpenAI({
    apiKey: secretKey,
  });

    if (userInput) {
        const threadMessages = contextHistory.map((item) => ({
            role: item.role,
            content: item.content,
          }));
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: threadMessages,
          stream: true,
        });
      
        let assistantResponse = "";

    for await (const chunk of completion) {
      if (chunk.choices[0].delta.content) {
        assistantResponse += chunk.choices[0].delta.content;
        console.log(chunk.choices[0].delta.content);
      }
    }

    content = assistantResponse;
    console.log(content);

    // Add the complete assistant response to the histories
    contextHistory.push({ title, role: "assistant", content: content });
        messageHistory.push({ title, role: "assistant", content: content });
        try {
            await prisma.$transaction(async (prisma) => {
              const existingChatbot = await prisma.chatOnlyBot.findFirst({ where: { userId } });
              if (!existingChatbot) {
                // Create a new Chatbot record if it doesn't exist
                await prisma.chatOnlyBot.create({
                  data: {
                    userId,
                    chatThreads: {
                      create: {
                        title,
                        chats: {
                          create: messageHistory.map((chat) => ({ role: chat.role, content: chat.content })),
                        },
                      },
                    },
                  },
                });
              } else {
          
                // Add new chats to the existing Chatbot record
              
                const chatThread = await prisma.chatOnlyThread.findFirst({
          
                  where: { title, chatbotId: existingChatbot.id },
          
                });
                if (!chatThread) {
                  await prisma.chatOnlyBot.update({
                    where: { id: existingChatbot.id },
                    data: {
                      chatThreads: {
                        create: {
                          title,
                          chats: {
                            create: messageHistory.map((chat) => ({ role: chat.role, content: chat.content })),
                          },
                        },
                      },
                    },
                  });
                } else {
                  await prisma.chatOnlyThread.update({
                    where: { id: chatThread.id },
                    data: {
                      chats: {
                        create: messageHistory.map((chat) => ({ role: chat.role, content: chat.content })),
                      },
                    },
                  });
                }
              }
            });
            messageHistory.length = 0;
          } catch (error) {
          
            console.log("error saving chats", error);
          
            return NextResponse.json({ error });
            
          }

    return NextResponse.json({ content });
  }


}

export const GET = async (request) => {
  const { searchParams } = new URL(request.url ?? '');
  const chatbotId = searchParams.get("id");
  const title=searchParams.get("title")
  try {
    const chatThreads = await prisma.chatOnlyThread.findMany({
      where: {
        chatbotId,
        // title
        ...(title && { title }),
      },
      include: {

        chats: true,  // Include the related `Chat` records

      },
    });
    const groupedChats = chatThreads.reduce((acc, chatThread) => {
      const { title, chats } = chatThread;
      if (!acc.has(title)) {
        acc.set(title, []);
      }
      acc.get(title).push(...chats);
      return acc;
    }, new Map());

    // Convert Map to a plain object for JSON serialization
    const groupedChatsObject = Object.fromEntries(groupedChats);

    return NextResponse.json(groupedChatsObject);
  } catch (error) {
    console.error("Error fetching flashcard sets:", error);
    return [];
  }
}