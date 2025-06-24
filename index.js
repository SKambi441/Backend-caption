import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // optional

// POST route for caption generation
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  console.log("Received prompt:", prompt);

  try {
    // Replace this with actual logic (like calling OpenAI, etc.)
    const caption = `Generated caption for: ${prompt}`;
    
    res.json({ caption });
  } catch (error) {
    console.error("Error generating caption:", error.message);
    res.status(500).json({ error: "Failed to generate caption." });
  }
});

// Optional fallback route
app.get("/", (req, res) => {
  res.send("API is running.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


