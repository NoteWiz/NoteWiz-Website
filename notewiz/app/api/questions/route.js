// api/questions/route.js
import dotenv from "dotenv"
import OpenAI from "openai";
import NodeCache from "node-cache";
import { createInterface } from "readline";
import { NextResponse } from "next/server";

dotenv.config({ path: "../../.env" });
const assistantCache = new NodeCache();

const API_KEY = process.env.API_KEY;

export const POST = async (request) => {
  let quizQuestions = [];
  console.log("in backend");
  const data = await request.formData();
  const type = data.get("type")?.toString() || "";
  const text = data.get("text")?.toString() || "";
  const topic = data.get("topic")?.toString() || "";
  // const file = data.get("file") as File | null;
  const questionType = data.get("questionType")?.toString() || "";
  const difficulty = data.get("difficulty")?.toString() || "";
  const numQuestions = data.get("numQuestions")?.toString() || "";

  console.log(type);
  console.log(text);
  console.log(topic);
  // console.log(file);
  console.log(questionType);
  console.log(difficulty);
  console.log(numQuestions);

  let NewFile = data.get("file")
  console.log(NewFile)

  try {
    var file;
    var fileID;
    var fileUrl;
    let myAssistant2 = assistantCache.get("myAssistant1");
    const secretKey = API_KEY;
    const openai = new OpenAI({
      apiKey: secretKey,
    });
    if (!myAssistant2) {
      myAssistant2 = await openai.beta.assistants.create({
        instructions: "Answer the user prompts as quickly and precisely as possible.",
        name: "Math Tutor",
        model: "gpt-4o",
      });
      assistantCache.set("myAssistant1", myAssistant2);
      console.log(myAssistant2)
    } else {
      console.log("assistant already created");
    }
    if (NewFile) {
      
      //   Upload the file
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
        fileUrl = NewFile.name;
  
        // Fallback if no file is uploaded, create a generic assistant without file search tools
        myAssistant2 = await openai.beta.assistants.update(myAssistant2.id, {
          instructions: "Answer the user prompts regarding the file uploaded by the user as quickly and precisely as possible, please give the response in form array of bullet points but in detail and do not contain the name of the file at the end of the response.",
          name: "Math Tutor",
          tools: [{ type: "file_search" }],
          tool_resources: {
            file_search: {
              vector_store_ids: [vectorStore.id],
            },
          },
          model: "gpt-4o",
        });
        assistantCache.set("myAssistant1", myAssistant2);
        // }
      } else {
        console.log("file already uploaded");
      }
      // }
    }
    console.log("Request received");
    
    console.log(questionType);
    console.log(fileUrl);
    

    let userPrompt;
    if (questionType && difficulty && numQuestions) {
      if (text) {
        if (questionType === "mcq") {
          userPrompt = `Generate ${numQuestions} ${questionType} ${difficulty} questions based on the text entered by the user and send the response in the form of an array of JSON objects, store the answer in any one of the options randomly,  like 
          {
            question: "question",
            answer: "answer with max length of 15 words",
            option1: "option1 with max length of 15 words",
            option2: "option2 with max length of 15 words",
            option3: "option3 with max length of 15 words",
            option4: "option4 with max length of 15 words",
          }`;
        } else if (questionType === "true_false") {
          userPrompt = `Generate ${numQuestions} ${questionType} ${difficulty} questions based on the text entered by the user. Send the response in the form of an array of JSON objects with the following format: 
          {
            question: "question",
            answer: "True/False",
            option1: "True",
            option2: "False",
          }`;
        } else {
          return NextResponse.status(400).json({ error: "Something went wrong" });
        }
      } else if (topic) {
        if (questionType === "mcq") {
          userPrompt = `Generate ${numQuestions} ${questionType} ${difficulty} questions based on the text entered by the user and send the response in the form of an array of JSON objects, store the answer in any one of the options randomly,  like 
          {
            question: "question",
            answer: "answer with max length of 15 words",
            option1: "option1 with max length of 15 words",
            option2: "option2 with max length of 15 words",
            option3: "option3 with max length of 15 words",
            option4: "option4 with max length of 15 words",
          }`;
        } else if (questionType === "true_false") {
          userPrompt = `Generate ${numQuestions} ${questionType} ${difficulty} questions based on the text entered by the user. Send the response in the form of an array of JSON objects with the following format: 
          {
            question: "question",
            answer: "True/False",
            option1: "True",
            option2: "False",
          }`;
        } else {
          return NextResponse.status(400).json({ error: "Something went wrong" });
        }
      } else {
        if (questionType === "mcq") {
          userPrompt = `Generate ${numQuestions} ${questionType} ${difficulty} questions based on the file content provided by the user and send the response in the form of an array of JSON objects only, store the answer in any one of the options randomly,  like 
          {
            question: "question",
            answer: "answer with max length of 15 words",
            option1: "option1 with max length of 15 words",
            option2: "option2 with max length of 15 words",
            option3: "option3 with max length of 15 words",
            option4: "option4 with max length of 15 words",
          }`;
        } else if (questionType === "true_false") {
          userPrompt = `Generate ${numQuestions} ${questionType} ${difficulty} questions based on the file content provided by the user. Send the response in the form of an array of JSON objects only with the following format: 
          {
            question: "question",
            answer: "True/False",
            option1: "True",
            option2: "False",
          }`;
        } else {
          return NextResponse.status(400).json({ error: "Something went wrong" });
        }
      }

      myAssistant2 = await openai.beta.assistants.update(myAssistant2.id, {
        instructions: userPrompt,
        name: "Question generator",
        model: "gpt-4o",
      });
      assistantCache.set("myAssistant1", myAssistant2);
      console.log(myAssistant2);

      let thread;

      let content;

      if (text) {
        content = text;
      } else if (topic) {
        content = topic;
      } else {
        content = "null";
      }

      console.log("thread created", thread);

      const stream = await openai.beta.threads.createAndRun( {
          assistant_id: myAssistant2.id,
          thread: {
            messages: [
                {
                  role: "user",
                  content: content,
                },
              ],
          },
        stream: true,
      });

      for await (const event of stream) {
        if (event.data && event.data.content) {
          event.data.content.forEach((contentItem) => {
            if (contentItem.text && contentItem.text.value) {
              try {
                const quiz = JSON.parse(contentItem.text.value);
                quizQuestions.push(quiz);
                console.log("love",quiz);
              } catch (error) {
                console.error("Error parsing JSON:", error);
                console.error("Raw response:", contentItem.text.value);
                // You can add additional error handling or logging here
              }
            }
          });
        } else {
          console.log("Waiting for more data...");
        }
      }

      const response = await openai.beta.assistants.del(myAssistant2.id);
      assistantCache.del("myAssistant1");
      
      // Clean up resources
      if (file) {
          await openai.files.del(file.id);
        }
        if (vectorStore) {
            await openai.beta.vectorStores.del(vectorStore.id);
        }
        
        console.log(response);
    }
} catch (error) {
    //
    
    // Clean up resources
    if (file) {
        await openai.files.del(file.id);
    }
    if (vectorStore) {
        await openai.beta.vectorStores.del(vectorStore.id);
    }
    console.error("Error:", error);
    NextResponse.status(500).json({ error: "Internal server error" });
}
return NextResponse.json({ quizQuestions, fileUrl, questionType }, { status: 200 });

}