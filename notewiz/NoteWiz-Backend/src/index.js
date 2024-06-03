import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import OpenAI from "openai";
import fileUpload from "express-fileupload";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import NodeCache from "node-cache";
import { createInterface } from "readline";
import bodyParser from "body-parser";
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

dotenv.config({path:"../../.env"});

const port = 4000;

const API_KEY = process.env.API_KEY;

const app = express();
app.use(express.json());
app.use(cors({origin:process.env.ORIGIN}));
app.use(express.urlencoded({extended:true}))
app.use(fileUpload());
app.use(express.static("public"));
// app.use("/upload", cors());
// app.use(bodyParser.json());
// const assistantCache = new NodeCache();
const uploadAssistantCache = new NodeCache();
const flashcardAssistantCache = new NodeCache();
const generateAssistantCache = new NodeCache();

const openai = new OpenAI({ apiKey: API_KEY }); // ...why

app.post("/upload", async (req, res) => {
  let myAssistant1 = uploadAssistantCache.get("myAssistant");
  let userInput = req.body.message;
  let fileId = req.body.fileId;
  console.log(userInput);
  const secretKey = API_KEY;
  const openai = new OpenAI({
    apiKey: secretKey,
  });
  var file;
  var fileID;

  if (!myAssistant1) {
    myAssistant1 = await openai.beta.assistants.create({
      instructions: "just do whatever the user says",
      name: "Math Tutor",
      model: "gpt-4-turbo",
    });
    uploadAssistantCache.set("myAssistant", myAssistant1);
  } else {
    console.log("assistant already created");
  }
  console.log("assistant 1", myAssistant1);
  if (req.files) {
    const __filename = fileURLToPath(import.meta.url);

    // Get the directory path of the current file
    const __dirname = path.dirname(__filename);

    const uploadsDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    let uploadedFile = req.files.file;
    console.log("file has been uploaded");
    console.log(uploadedFile);

    const fileExtension = path.extname(uploadedFile.name);

    // Generate a unique filename
    const fileName = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}${fileExtension}`;

    // Save the file to the uploads directory
    const filePath = path.join(uploadsDir, fileName);
    await uploadedFile.mv(filePath);

    console.log(filePath);
    //   Upload the file
    file = await openai.files.create({
      file: fs.createReadStream(filePath),
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
      instructions: "just do whatever the user says",
      name: "Math Tutor",
      tools: [{ type: "file_search" }],
      tool_resources: {
        file_search: {
          vector_store_ids: [vectorStore.id],
        },
      },
      model: "gpt-4-turbo",
    });
    uploadAssistantCache.set("myAssistant", myAssistant1);
    // }
  }
  if (userInput) {
    let thread = await openai.beta.threads.create({
      messages: [
        {
          role: "user",
          content: userInput,
          attachments: fileID
            ? [{ file_id: fileID, tools: [{ type: "file_search" }] }]
            : [],
        },
      ],
    });
    console.log("thread created", thread);

    const stream = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: myAssistant1.id,
      stream: true,
    });
    function cleanResponseText(text) {
      return text.replace(/【\d+:\d+†source】/g, "");
    }
    for await (const event of stream) {
      if (event.data && event.data.content) {
        // Loop through each content item (assuming each content item follows the shown structure)
        event.data.content.forEach((contentItem) => {
          if (contentItem.text && contentItem.text.value) {
            const cleanedText = cleanResponseText(contentItem.text.value);
            console.log(cleanedText); // Now logging without the source marks
            res.json({ messages: cleanedText });
          }
        });
      } else {
        console.log("Waiting for more data...");
      }
    }
  } else {
    console.log("error entering if block");
  }
});
app.post("/flashcard", async (req, res) => {
  let myAssistant1 = flashcardAssistantCache.get("myAssistant1");
  let userInput = req.body.message;
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
    flashcardAssistantCache.set("myAssistant1", myAssistant1);
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
  res.json(flashcards);
  const response = await openai.beta.assistants.del(myAssistant1.id);
  flashcardAssistantCache.del("myAssistant1");
  console.log(response);
});

app.post("/generate", async (req, res) => {
  let info = false;
  console.log("in backend");
  try {
    var file;
    var fileID;
    let myAssistant1 = generateAssistantCache.get("myAssistant");
    const secretKey = API_KEY;
    const openai = new OpenAI({
      apiKey: secretKey,
    });
    if (!myAssistant1) {
      myAssistant1 = await openai.beta.assistants.create({
        instructions: "just do whatever the user says",
        name: "Math Tutor",
        model: "gpt-4-turbo",
      });
      generateAssistantCache.set("myAssistant", myAssistant1);
    } else {
      console.log("assistant already created");
    }
    if (req.files) {
      const __filename = fileURLToPath(import.meta.url);

      // Get the directory path of the current file
      const __dirname = path.dirname(__filename);

      const uploadsDir = path.join(__dirname, "QuizUploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      let uploadedFile = req.files.file;
      console.log("file has been uploaded");
      console.log(uploadedFile);

      const fileExtension = path.extname(uploadedFile.name);

      // Generate a unique filename
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 15)}${fileExtension}`;

      // Save the file to the uploads directory
      const filePath = path.join(uploadsDir, fileName);
      await uploadedFile.mv(filePath);

      console.log(filePath);
      //   Upload the file
      file = await openai.files.create({
        file: fs.createReadStream(filePath),
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
        instructions: "just do whatever the user says",
        name: "Question generator",
        tools: [{ type: "file_search" }],
        tool_resources: {
          file_search: {
            vector_store_ids: [vectorStore.id],
          },
        },
        model: "gpt-4-turbo",
      });
      generateAssistantCache.set("myAssistant", myAssistant1);
      // }
    }
    console.log("Request received");
    let myAssistant;
    let { textValue, topicValue, questionType, difficulty, numQuestions } =
      req.body;
    console.log(questionType);
    const quizQuestions = [];

    let userPrompt;
    if (questionType && difficulty && numQuestions) {
      if (textValue) {
        if (questionType === "Multiple Choice") {
          userPrompt = `Generate ${numQuestions} ${questionType} ${difficulty} questions based on the text entered by the user and send the response in the form of an array of JSON objects, store the answer in any one of the options randomly,  like 
          {
            question: "question",
            answer: "answer with max length of 15 words",
            option1: "option1 with max length of 15 words",
            option2: "option2 with max length of 15 words",
            option3: "option3 with max length of 15 words",
            option4: "option4 with max length of 15 words",
          }`;
        } else if (questionType === "True/False") {
          userPrompt = `Generate ${numQuestions} ${questionType} ${difficulty} questions based on the text entered by the user. Send the response in the form of an array of JSON objects with the following format: 
          {
            question: "question",
            answer: "True/False",
            option1: "True",
            option2: "False",
          }`;
        } else {
          return res.status(400).json({ error: "Something went wrong" });
        }
      } else if (topicValue) {
        if (questionType === "Multiple Choice") {
          userPrompt = `Generate ${numQuestions} ${questionType} ${difficulty} questions based on the text entered by the user and send the response in the form of an array of JSON objects, store the answer in any one of the options randomly,  like 
          {
            question: "question",
            answer: "answer with max length of 15 words",
            option1: "option1 with max length of 15 words",
            option2: "option2 with max length of 15 words",
            option3: "option3 with max length of 15 words",
            option4: "option4 with max length of 15 words",
          }`;
        } else if (questionType === "True/False") {
          userPrompt = `Generate ${numQuestions} ${questionType} ${difficulty} questions based on the text entered by the user. Send the response in the form of an array of JSON objects with the following format: 
          {
            question: "question",
            answer: "True/False",
            option1: "True",
            option2: "False",
          }`;
        } else {
          return res.status(400).json({ error: "Something went wrong" });
        }
      } else {
        if (questionType === "Multiple Choice") {
          userPrompt = `Generate ${numQuestions} ${questionType} ${difficulty} questions based on the text entered by the user and send the response in the form of an array of JSON objects, store the answer in any one of the options randomly,  like 
          {
            question: "question",
            answer: "answer with max length of 15 words",
            option1: "option1 with max length of 15 words",
            option2: "option2 with max length of 15 words",
            option3: "option3 with max length of 15 words",
            option4: "option4 with max length of 15 words",
          }`;
        } else if (questionType === "True/False") {
          userPrompt = `Generate ${numQuestions} ${questionType} ${difficulty} questions based on the text entered by the user. Send the response in the form of an array of JSON objects with the following format: 
          {
            question: "question",
            answer: "True/False",
            option1: "True",
            option2: "False",
          }`;
        } else {
          return res.status(400).json({ error: "Something went wrong" });
        }
      }

      myAssistant1 = await openai.beta.assistants.update(myAssistant1.id, {
        instructions: userPrompt,
        name: "Question generator",
        model: "gpt-4-turbo",
      });
      generateAssistantCache.set("myAssistant", myAssistant1);
      console.log(myAssistant1);

      let thread;

      let content;

      if (textValue) {
        content = textValue;
      } else if (topicValue) {
        content = topicValue;
      } else {
        content = "null";
      }

      thread = await openai.beta.threads.create({
        messages: [
          {
            role: "user",
            content: content,
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
          event.data.content.forEach((contentItem) => {
            if (contentItem.text && contentItem.text.value) {
              try {
                const quiz = JSON.parse(contentItem.text.value);
                quizQuestions.push(quiz);
                console.log(quiz);
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

      res.json(quizQuestions);
      const response = await openai.beta.assistants.del(myAssistant1.id);
      generateAssistantCache.del("myAssistant");

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
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });

    // Clean up resources
    if (file) {
      await openai.files.del(file.id);
    }
    if (vectorStore) {
      await openai.beta.vectorStores.del(vectorStore.id);
    }
  }
});

app.get("/", (req, res) => {
  res.send("Connection established");
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`server running on port ${port}`);
  } else {
    console.log(error);
  }
});
