const port = 4000;
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import fileUpload from "express-fileupload";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import NodeCache from "node-cache";
// import { ReadLine } from "readline";
// import { promises as fs, createReadStream } from "fs";
import { createInterface } from "readline";
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use("/upload", cors());
const assistantCache = new NodeCache();

const API_KEY = "sk-proj-S8Ya3rkddXCk3yPDEc1RT3BlbkFJv6AxYtxA2oCos5Vg7lMr";

app.post("/connections", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/upload", async (req, res) => {
  let myAssistant1 = assistantCache.get("myAssistant");
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
    assistantCache.set("myAssistant", myAssistant1);
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
    // return res.status(400).send("No files were uploaded.");

    let uploadedFile = req.files.file;
    console.log("file has been uploaded");
    console.log(uploadedFile);
    // async function main() {
    // Create the uploads directory if it doesn't exist

    const fileExtension = path.extname(uploadedFile.name);

    // Generate a unique filename
    const fileName = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}${fileExtension}`;

    // Save the file to the uploads directory
    const filePath = path.join(uploadsDir, fileName);
    await uploadedFile.mv(filePath);

    console.log(filePath);
    // let fileName = "./assistant.txt";
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

    //     // var myAssistant2 = await openai.beta.assistants.create({
    //     //   instructions: "just do whatever the user says",
    //     //   name: "Math Tutor",
    //     //   tools: [{ type: "file_search" }],
    //     //   model: "gpt-4-turbo",
    //     // });
    //     // console.log("assistant 2", myAssistant2);

    // }

    // }
    // main().catch(console.error);
    // } else {
    //   if (userInput) {
    //     let thread = await openai.beta.threads.create({
    //       messages: [
    //         {
    //           role: "user",
    //           content: userInput,
    //           // attachments: [
    //           //   { file_id: file2.id, tools: [{ type: "file_search" }] },
    //           // ],
    //         },
    //       ],
    //     });
    //     console.log("thread created", thread);

    //     const stream = await openai.beta.threads.runs.create(thread.id, {
    //       assistant_id: myAssistant2.id,
    //       stream: true,
    //     });

    //     for await (const event of stream) {
    //       if (event.data && event.data.content) {
    //         // Loop through each content item (assuming each content item follows the shown structure)
    //         event.data.content.forEach((contentItem) => {
    //           if (contentItem.text && contentItem.text.value) {
    //             console.log(contentItem.text.value); // Log the value property
    //             res.json({ messages: contentItem.text.value });
    //           }
    //         });
    //       } else {
    //         console.log("Waiting for more data...");
    //       }
    //     }
    //   }
    // if (myAssistant1) {
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
    assistantCache.set("myAssistant", myAssistant1);
    // }
  }
  if (userInput) {
    // console.log(fileID);
    // if (file2) {
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
  } // } else {
  else {
    console.log("error entering if block");
  }
});
app.post("/chat", async (req, res) => {
  const secretKey = API_KEY;
  const openai = new OpenAI({
    apiKey: secretKey,
  });
  let input = req.body.message;
  console.log(input);

  var myAssistant = await openai.beta.assistants.create({
    instructions: "just do whatever the user says",
    name: "Math Tutor",
    tools: [{ type: "file_search" }],
    model: "gpt-4-turbo",
  });
  console.log(myAssistant);
  let thread = await openai.beta.threads.create({
    messages: [
      {
        role: "user",
        content: input,
      },
    ],
  });
  console.log("thread created", thread);

  const stream = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: myAssistant.id,
    stream: true,
  });

  for await (const event of stream) {
    if (event.data && event.data.content) {
      // Loop through each content item (assuming each content item follows the shown structure)
      event.data.content.forEach((contentItem) => {
        if (contentItem.text && contentItem.text.value) {
          console.log(contentItem.text.value); // Log the value property
          res.json({ messages: contentItem.text.value });
        }
      });
    } else {
      console.log("Waiting for more data...");
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
