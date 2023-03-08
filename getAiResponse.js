import axios from "axios";

async function getAiResponse(topic, apiKey) {
   const url = "https://api.openai.com/v1/engines/text-davinci-002/completions";
   const data = {
      prompt: topic,
      max_tokens: 1024,
      n: 1,
      stop: null,
      temperature: 0.7,
   };
   const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
   };
   const response = await axios.post(url, data, { headers });
   return response.data.choices[0].text;
}

export default getAiResponse;
