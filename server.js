const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-lyrics", async (req, res) => {
   try {
      const prompt = req.body.prompt;
      const apiKey = process.env.OPENAI_API_KEY;

      const response = await axios.post(
         "https://api.openai.com/v1/engines/davinci-codex/completions",
         {
            prompt: `Generate a unique song about ${prompt}\n\nGenerated Lyrics:`,
            temperature: 0.7,
            max_tokens: 150,
            n: 1,
            stop: null,
         },
         {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${apiKey}`,
            },
         }
      );

      res.json({ lyrics: response.data.choices[0].text.trim() });
   } catch (error) {
      console.error("Error in /generate-lyrics route:", error.response.data);
      res.status(500).json({
         error: "An error occurred while generating lyrics.",
      });
   }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
