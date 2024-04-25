// const express = require('express');
// const multer  = require('multer');
// const fs = require('fs');
// const OpenAI = require("openai");
// const client = new OpenAI();

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// app.post('/upload', upload.single('file'), async (req, res) => {
//   // File uploaded to the server, process it further or send it to OpenAI API
//   const fileStream = fs.createReadStream(req.file.path);

//   // Create a vector store or perform other operations with the file
//   // Example:
//   const vectorStore = await client.beta.vectorStores.create({
//     name: "Financial Statement",
//   });

//   await client.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, [fileStream]);

//   // Send response to the frontend
//   res.send('File uploaded successfully');
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
