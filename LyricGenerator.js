import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import getAiResponse from "./getAiResponse";

function LyricGenerator() {
   const [prompt, setPrompt] = useState("");
   const [generatedLyrics, setGeneratedLyrics] = useState("");

   async function handleGenerateLyrics() {
      const apiKey = "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";
      const lyrics = await getAiResponse(prompt, apiKey);
      setGeneratedLyrics(lyrics);
   }

   return (
      <View>
         <Text>Enter a prompt for the generated lyrics:</Text>
         <TextInput
            value={prompt}
            onChangeText={(text) => setPrompt(text)}
            placeholder="e.g. The night is dark and full of terrors..."
         />
         <Button title="Generate Lyrics" onPress={handleGenerateLyrics} />
         {generatedLyrics ? <Text>{generatedLyrics}</Text> : null}
      </View>
   );
}

export default LyricGenerator;
