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

const API_KEY = "sk-proj-QXvDMcXyKYvi7S3YFwfqT3BlbkFJb3MRit1lZ0l398aLUPBm";

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
  let userInput = req.body.message;
  console.log(userInput);
  const __filename = fileURLToPath(import.meta.url);

  // Get the directory path of the current file
  const __dirname = path.dirname(__filename);

  const uploadsDir = path.join(__dirname, "uploads");

  // Create the uploads directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const uploadedFile = req.files.file;
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
  // Create a OpenAI connection
  const secretKey = API_KEY;
  const openai = new OpenAI({
    apiKey: secretKey,
  });

  async function main() {
    let fileName = "./assistant.txt";
    //   Upload the file
    let file = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "assistants",
    });
    console.log(file);
    const vectorStore = await openai.beta.vectorStores.create({
      name: "NoteWiz",
    });
    console.log(vectorStore);
    const myVectorStoreFile = await openai.beta.vectorStores.files.create(
      vectorStore.id,
      {
        file_id: file.id,
      }
    );
    console.log(myVectorStoreFile);
    let myAssistant = await openai.beta.assistants.create({
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

    console.log(myAssistant);

    // let fileContent = await openai.files.content(file.id);
    // console.log(fileContent);
    //   });
    //   const fileContent = await openai.files.content(file.id);
    //   console.log(fileContent);

    // let thread = await openai.beta.threads.create({
    //   messages: [
    //     {
    //       role: "user",
    //       content: "2+2 is equal to?",
    //       // Attach the new file to the message.
    //       attachments: [{ file_id: file.id, tools: [{ type: "file_search" }] }],
    //     },
    //   ],
    // });
    // console.log(thread.tool_resources?.file_search);
    // readline.setPrompt("You > ");
    // readline.prompt();

    let thread;

    // readline.on("line", async (userInput) => {
    if (!thread) {
      thread = await openai.beta.threads.create({
        messages: [
          {
            //   role: "system",
            //   content: uploadedFile.data.toString("utf-8"),
            //   attachments: [
            //     {
            //       file_id: file.id,
            //       tools: [{ type: "file_search" }],
            //     },
            //   ],
            role: "user",
            content: userInput,
            attachments: [
              {
                file_id: file.id,
                tools: [{ type: "file_search" }],
              },
            ],
          },
        ],
      });
    } else {
      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: userInput,
      });
    }

    //   const run = openai.beta.threads.runs
    //     .stream(thread.id, {
    //       assistant_id: myAssistant.id,
    //     })
    //     .on("textCreated", (text) => process.stdout.write("\nassistant > "))
    //     .on("textDelta", (textDelta, snapshot) =>
    //       process.stdout.write(textDelta.value)
    //     )
    //     .on("toolCallCreated", (toolCall) =>
    //       process.stdout.write(`\nassistant > ${toolCall.type}\n\n`)
    //     )
    //     .on("toolCallDelta", (toolCallDelta, snapshot) => {
    //       if (toolCallDelta.type === "file_search") {
    //         if (toolCallDelta.file_search) {
    //           process.stdout.write(toolCallDelta.file_search.file.id);
    //         }
    //         if (toolCallDelta.file_search) {
    //           process.stdout.write("\noutput >\n");
    //           toolCallDelta.file_search.forEach((output) => {
    //             if (output.type === "logs") {
    //               process.stdout.write(`\n${output.logs}\n`);
    //             }
    //           });
    //         }
    //       }
    //     });
    const stream = openai.beta.threads.runs
      .stream(thread.id, {
        assistant_id: myAssistant.id,
      })
      .on("textCreated", () => console.log("assistant >"))
      .on("toolCallCreated", (event) => console.log("assistant " + event.type))
      .on("messageDone", async (event) => {
        if (event.content[0].type === "text") {
          const { text } = event.content[0];
          const { annotations } = text;
          const citations = [];
          const data = await annotation.text.json();
          res.send(data);
          let index = 0;
          for (let annotation of annotations) {
            text.value = text.value.replace(annotation.text, "[" + index + "]");
            const { file_citation } = annotation;
            if (true) {
              const citedFile = await openai.files.retrieve(file.id);
              citations.push("[" + index + "]" + citedFile.filename);
            }
            index++;
          }

          // console.log(text.value);
          // console.log(citations.join("\n"));
        }
      });

    //   readline.prompt();
    // });

    readline.on("close", () => {
      console.log("Exiting...");
      process.exit(0);
    });
  }
  main().catch(console.error);
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
