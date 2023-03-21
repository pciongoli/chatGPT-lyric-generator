import axios from "axios";

const getAiResponse = async (prompt, apiKey) => {
   try {
      const response = await axios.post(
         "https://api.openai.com/v1/engines/text-davinci-003/completions",
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

      return response.data.choices[0].text.trim();
   } catch (error) {
      console.error("Error in getAiResponse:", error.response.data);
      throw error;
   }
};

export default getAiResponse;
