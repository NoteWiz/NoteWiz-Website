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
  return text.replace(/【\d+:\d+†.*】|[#*~`]/g, "");
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
  // assistantHistory.push({ title:title, role: "user", content: userInput });
  contextHistory.push({ title, role: "user", content: userInput });

  if (!messageHistory.some(message => message.content === userInput && message.role === "user")) {
    messageHistory.push({ title, role: "user", content: userInput });
  }


  const secretKey = API_KEY;
  const openai = new OpenAI({
    apiKey: secretKey,
  });
  var file;
  var fileID;

  if (!myAssistant1) {
    myAssistant1 = await openai.beta.assistants.create({
      instructions: "Answer the user prompts regarding the file uploaded by the user as quickly and precisely as possible, don't delay the answer and do not contain the name of the file at the end of the response.",
      name: "Chatbot",
      model: "gpt-4o",
    });
    assistantCache.set("myAssistant", myAssistant1);
  } else {
    console.log("assistant already created");
  }
  console.log("assistant 1", myAssistant1);
  if (NewFile) {
    console.log("inside if block")
    //upload file to openai
    if (!file) {

      file = await openai.files.create({
        file: NewFile,
        purpose: "assistants",
      });
      console.log(file);
      var vectorStore = await openai.beta.vectorStores.create({
        name: "NoteWiz",
      });
      console.log(vectorStore);
      var myVectorStoreFile = await openai.beta.vectorStores.files.create(
        vectorStore.id,
        {
          file_id: file.id,
        }
      );
      console.log(myVectorStoreFile);
      fileID = file.id;

      // Fallback if no file is uploaded, create a generic assistant without file search tools
      myAssistant1 = await openai.beta.assistants.update(myAssistant1.id, {
        instructions: "Answer the user prompts regarding the file uploaded by the user as quickly and precisely as possible, please give the response in form array of bullet points but in detail and do not contain the name of the file at the end of the response.",
        name: "Chatbot",
        tools: [{ type: "file_search" }],
        tool_resources: {
          file_search: {
            vector_store_ids: [vectorStore.id],
          },
        },
        model: "gpt-4o",
      });
      assistantCache.set("myAssistant", myAssistant1);
      // }
    } else {
      console.log("file already uploaded");
    }
  }
  if (userInput) {
    const threadMessages = contextHistory.map((item) => ({
      role: item.role,
      content: item.content,
      attachments: fileID ? [{ file_id: fileID, tools: [{ type: "file_search" }] }] : [],
    }));
    //create a thread and run
    const stream = await openai.beta.threads.createAndRun({
      assistant_id: myAssistant1.id,
      thread: {
        messages: threadMessages
      },
      stream: true,
    });
    // const myThread = await openai.beta.threads.retrieve(
    //   stream.thread_id
    // );
  
    // console.log(myThread);
    const messages =[];
    let combinedResponse = '';
    for await (const event of stream) {
      if (event.data && event.data.content) {
        // Loop through each content item (assuming each content item follows the shown structure)
        event.data.content.forEach((contentItem) => {
          if (contentItem.text && contentItem.text.value) {
            const cleanedText = cleanResponseText(contentItem.text.value);
            console.log(cleanedText); // Now logging without the source marks
            combinedResponse += cleanedText;
            messages.push(cleanedText);
            // messages.forEach((response) => {
            //   assistantHistory.push({ title:title, role: "assistant", content: response });
            // });
            // console.log(assistantHistory)
            if (!contextHistory.some(chat => chat.content === cleanedText && chat.role === "assistant")) {
              contextHistory.push({ title, role: "assistant", content: cleanedText });
            }

            if (!messageHistory.some(chat => chat.content === cleanedText && chat.role === "assistant")) {
              messageHistory.push({ title, role: "assistant", content: cleanedText });
            }
          }
        });
      } else {
        console.log("Waiting for more data...");
      }
    }
    
    // console.log(assistantHistory)
    try {
      await prisma.$transaction(async (prisma) => {
        const existingChatbot = await prisma.chatbot.findFirst({ where: { userId } });
        if (!existingChatbot) {
          // Create a new Chatbot record if it doesn't exist
          await prisma.chatbot.create({
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
        
          const chatThread = await prisma.chatThread.findFirst({
    
            where: { title, chatbotId: existingChatbot.id },
    
          });
          if (!chatThread) {
            await prisma.chatbot.update({
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
            await prisma.chatThread.update({
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
      if (file) {
        await openai.files.del(file.id);
      }
      if (vectorStore) {
          await openai.beta.vectorStores.del(vectorStore.id);
      }
      
    } catch (error) {
    
      console.log("error saving chats", error);
      if (file) {
        await openai.files.del(file.id);
      }
      if (vectorStore) {
          await openai.beta.vectorStores.del(vectorStore.id);
      }
      
    
      return NextResponse.json({ error });
      
    }
    return NextResponse.json({ messages });

  } else {
    console.log("error entering if block");
    return NextResponse.json({ error: "No user input provided" });
  }
}

export const GET = async (request) => {
  const { searchParams } = new URL(request.url ?? '');
  const chatbotId = searchParams.get("id");
  const title=searchParams.get("title")
  try {
    const chatThreads = await prisma.chatThread.findMany({
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