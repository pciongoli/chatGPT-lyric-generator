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
   ActivityIndicator,
} from "react-native";
import getAiResponse from "./getAiResponse";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { OPENAI_API_KEY } from "@env";

export default function LyricGenerator({ navigation }) {
   const [prompt, setPrompt] = useState("");
   const [generatedLyrics, setGeneratedLyrics] = useState("");
   const [isEditingLyrics, setIsEditingLyrics] = useState(false);
   const [savedLyrics, setSavedLyrics] = useState([]);
   const [loading, setLoading] = useState(false);

   async function handleGenerateLyrics() {
      setLoading(true);
      const lyrics = await getAiResponse(
         "Write a unique song about " + prompt,
         OPENAI_API_KEY
      );
      setLoading(false);
      setGeneratedLyrics(lyrics);
      setIsEditingLyrics(false); // reset editing mode
   }

   function handleEditLyrics() {
      setIsEditingLyrics(true);
   }

   function handleEndEditingLyrics() {
      setIsEditingLyrics(false);
   }

   function handleCopyLyrics() {
      Clipboard.setString(generatedLyrics);
   }

   return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
         <LinearGradient
            colors={["#C6E1F7", "#CEE5F2"]}
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
                  numberOfLines={2}
                  textAlignVertical="top"
                  onBlur={handleEndEditingLyrics} // call handleEndEditingLyrics when the user leaves the text input
               />
               <Button
                  title="Generate Your Song!"
                  onPress={handleGenerateLyrics}
               />
               {loading ? (
                  <ActivityIndicator size="large" color="#ffffff" />
               ) : generatedLyrics !== "" ? (
                  <>
                     {isEditingLyrics ? (
                        <View>
                           <TextInput
                              style={styles.generatedLyrics}
                              multiline
                              numberOfLines={4}
                              value={generatedLyrics}
                              onChangeText={(text) => setGeneratedLyrics(text)}
                           />
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
                              title="Copy"
                              onPress={handleCopyLyrics}
                           />
                        </View>
                     )}
                  </>
               ) : null}
            </ScrollView>
            {savedLyrics.length > 0 && (
               <View style={styles.footer}>
                  <Button
                     title="View Saved Lyrics"
                     onPress={() =>
                        navigation.navigate("SavedLyrics", {
                           savedLyrics: savedLyrics,
                        })
                     }
                  />
               </View>
            )}
         </LinearGradient>
      </KeyboardAvoidingView>
   );
}
