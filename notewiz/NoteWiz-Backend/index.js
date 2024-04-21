const port = 4000;
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
// import OpenAI from 'openai';

import multer from  'multer';
import fs from 'fs';


// const client = new OpenAI({
//   apiKey: 'sk-proj-L7lUhXh2ZthwV27ebxXkT3BlbkFJvwS1m9crm1ymRbMSzM0S' // Replace 'YOUR_API_KEY_HERE' with your actual API key
// });




// const openai = new OpenAI({
//   organization: 'NoteWiz',
//   project: 'NoteWiz_Chatbot',
// });


dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  }
});
const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "sk-proj-Sv5Zao4g9ci9oPh2m1MsT3BlbkFJ9VMcfOSznouqSlGOTiMq";

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

// Add multer middleware for handling file uploads
app.post("/upload", upload.single("file"), async (req, res) => {
  // File uploaded to the server, process it further or send it to OpenAI API
  const fileStream = fs.createReadStream(req.file.path);

  // Create a vector store or perform other operations with the file
  // Example:
  const vectorStore = await client.beta.vectorStores.create({
    name: "Financial Statement",
  });

  await client.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, [
    fileStream,
  ]);

  // Send response to the frontend
  res.send("File uploaded successfully");
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
