// App.js

import React, { useState } from "react";
import { View, TextInput, Button, Text, ScrollView, Image } from "react-native";
import getAiResponse from "./getAiResponse";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
   const [prompt, setPrompt] = useState("");
   const [generatedLyrics, setGeneratedLyrics] = useState("");

   async function handleGenerateLyrics() {
      const apiKey = "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";
      const lyrics = await getAiResponse(prompt + " lyrics", apiKey);
      setGeneratedLyrics(lyrics);
   }

   return (
      <LinearGradient
         colors={["#C33764", "#1D2671"]}
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 1 }}
         style={styles.container}
      >
         <View style={styles.titleContainer}>
            <Text style={styles.title}>Lyric Generator</Text>
         </View>
         <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image
               source={require("./assets/img/lyriCat.jpg")}
               style={styles.image}
            />
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
               Enter a Prompt to Generate Your Song!
            </Text>
            <TextInput
               value={prompt}
               onChangeText={(text) => setPrompt(text)}
               placeholder="e.g. Chickens and Turkeys"
               style={styles.input}
               multiline
               numberOfLines={4}
               textAlignVertical="top"
            />
            <Button
               title="Generate Your Song!"
               onPress={handleGenerateLyrics}
            />
            {generatedLyrics ? (
               <Text style={styles.generatedLyrics}>{generatedLyrics}</Text>
            ) : null}
         </ScrollView>
      </LinearGradient>
   );
}
