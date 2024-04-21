const port = 4000;
import express from "express";
import fetch from 'node-fetch';
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "sk-proj-ir6Fv5qx1QhEhORmKpnrT3BlbkFJwC24vzB0deSbouwLp3cT"; 

app.post('/connections', async (req, res) => {

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: req.body.message }],
            max_tokens: 100,
        }) 
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error);
    }
})

app.get("/", (req,res) => {
  res.send("Connection established");
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`server running on port ${port}`);
  } else {
    console.log(error);
  }
});
