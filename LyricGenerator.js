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
   TouchableOpacity,
} from "react-native";
import * as Speech from "expo-speech";
import getAiResponse from "./getAiResponse";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { OPENAI_API_KEY } from "@env";
import { Picker } from "@react-native-picker/picker";

export default function LyricGenerator({ navigation }) {
   const [prompt, setPrompt] = useState("");
   const [generatedLyrics, setGeneratedLyrics] = useState("");
   const [isEditingLyrics, setIsEditingLyrics] = useState(false);
   const [savedLyrics, setSavedLyrics] = useState([]);
   const [loading, setLoading] = useState(false);
   const [selectedGenre, setSelectedGenre] = useState("Pop");

   async function handleGenerateLyrics() {
      setLoading(true);
      try {
         const lyrics = await getAiResponse(
            prompt,
            OPENAI_API_KEY,
            selectedGenre
         );
         setLoading(false);
         setGeneratedLyrics(lyrics);
         setIsEditingLyrics(false); // reset editing mode
      } catch (error) {
         setLoading(false);
         console.error("Error generating lyrics:", error);
         alert(
            "An error occurred while generating lyrics. Please check the console for more information."
         );
      }
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

   async function speakLyrics() {
      const isSpeaking = await Speech.isSpeakingAsync();

      if (isSpeaking) {
         Speech.stop();
      } else {
         Speech.speak(generatedLyrics, { pitch, rate });
      }
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
               <TouchableOpacity onPress={speakLyrics}>
                  <Image
                     source={require("./assets/img/lyriCat.jpg")}
                     style={styles.image}
                  />
               </TouchableOpacity>
               <Text style={{ fontSize: 18, marginBottom: 10 }}>
                  Click me to hear your song!
               </Text>
               {/* Genre Picker */}
               <Text style={{ fontSize: 18, marginBottom: 10 }}>
                  Select a Genre:
               </Text>
               <Picker
                  selectedValue={selectedGenre}
                  onValueChange={(itemValue) => setSelectedGenre(itemValue)}
                  style={styles.genrePicker}
               >
                  <Picker.Item label="Select a genre..." value="" />
                  <Picker.Item label="Pop" value="pop" />
                  <Picker.Item label="Rock" value="rock" />
                  <Picker.Item label="Hip Hop" value="hiphop" />
                  <Picker.Item label="Country" value="country" />
                  <Picker.Item label="R&B" value="rnb" />
                  <Picker.Item label="Jazz" value="jazz" />
                  <Picker.Item label="Blues" value="blues" />
                  {/* Add more genres as needed */}
               </Picker>
               {/* Prompt Input */}
               <Text style={{ fontSize: 18, marginBottom: 10 }}>
                  Enter a Prompt to Generate Your Song!
               </Text>
               <TextInput
                  value={prompt}
                  onChangeText={(text) => setPrompt(text)}
                  placeholder="e.g. "
                  style={styles.input}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  onBlur={handleEndEditingLyrics}
               />
               <Button
                  title="Generate Your Song!"
                  onPress={handleGenerateLyrics}
               />
               {/* loading icon */}
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
         </LinearGradient>
      </KeyboardAvoidingView>
   );
}
