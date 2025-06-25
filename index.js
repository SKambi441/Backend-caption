
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));// to serve static files

app.get("/", (req, res) => {
  res.send("Caption Generator Backend is running!");
});

app.post("/generate", async (req, res) => {
    const { prompt } = req.body;
    console.log("Received prompt: ", prompt);
  
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { 
              role:"user",
              content: prompt
            }
            ],
          max_tokens: 80,
          temperature: 0.7,
        })
    });
    
    const data = await response.json();
    console.log("OpenAI response: ", data);

    if (data&& data.choices && data.choices.length > 0) {
      const caption = data.choices[0].text.trim();
      res.json({ caption});
    } else {
      console.error("OpenAI API returned unexpected response:", data);
      res.status(500).json({error:"Unexpected response from OpenAI API."});
    }
    
  } catch (error) {
    console.error("Error from OpenAI API: ", error);
    res.status(500).json({ error: "Error generating caption" });
  }
});

app.listen(PORT,() => {
    console.log(`Server is running at http://localhost:${PORT}`);
  
  
});
