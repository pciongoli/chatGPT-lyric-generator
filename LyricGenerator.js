import React, { useState } from "react";
import {
   View,
   TextInput,
   Button,
   Text,
   ScrollView,
   Image,
   KeyboardAvoidingView,
   Clipboard,
} from "react-native";
import getAiResponse from "./getAiResponse";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";

export default function LyricGenerator() {
   const [prompt, setPrompt] = useState("");
   const [generatedLyrics, setGeneratedLyrics] = useState("");
   const [isEditingLyrics, setIsEditingLyrics] = useState(false);

   async function handleGenerateLyrics() {
      const apiKey = "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";
      const lyrics = await getAiResponse(
         prompt + " unique song lyrics",
         apiKey
      );
      setGeneratedLyrics(lyrics);
      setIsEditingLyrics(false); // reset editing mode
   }

   function handleEditLyrics() {
      setIsEditingLyrics(true);
   }

   function handleSaveLyrics() {
      setIsEditingLyrics(false);
   }

   function handleCopyLyrics() {
      Clipboard.setString(generatedLyrics);
   }

   return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
         <LinearGradient
            colors={["#C33764", "#1D2671"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
         >
            <View style={styles.titleContainer}>
               <Text style={styles.title}>LyriCat</Text>
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
               {isEditingLyrics ? (
                  <View>
                     <TextInput
                        style={styles.generatedLyrics}
                        multiline
                        numberOfLines={10}
                        value={generatedLyrics}
                        onChangeText={(text) => setGeneratedLyrics(text)}
                     />
                     <Button title="Save" onPress={handleSaveLyrics} />
                  </View>
               ) : (
                  <View>
                     <Text
                        style={styles.generatedLyrics}
                        onPress={handleEditLyrics}
                     >
                        {generatedLyrics}
                     </Text>
                     <Button
                        style={styles.button}
                        title="Edit"
                        onPress={handleEditLyrics}
                     />
                     <Button
                        style={styles.button}
                        title="Copy"
                        onPress={handleCopyLyrics}
                     />
                  </View>
               )}
            </ScrollView>
         </LinearGradient>
      </KeyboardAvoidingView>
   );
}
