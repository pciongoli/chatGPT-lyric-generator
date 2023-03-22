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
   Keyboard,
} from "react-native";
import * as Speech from "expo-speech";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

   function dismissKeyboard() {
      Keyboard.dismiss();
   }

   async function speakLyrics() {
      const isSpeaking = await Speech.isSpeakingAsync();

      if (isSpeaking) {
         Speech.stop();
      } else {
         Speech.speak(generatedLyrics);
      }
   }

   return (
      <LinearGradient
         colors={["#76C4AE", "#9FC2BA"]}
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 1 }}
         style={styles.container}
      >
         <View style={styles.titleContainer}>
            <Text style={styles.title}>LyriCat</Text>
         </View>

         <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContainer}
            extraHeight={100}
         >
            <TouchableOpacity
               onPress={dismissKeyboard}
               activeOpacity={1}
               style={{ flex: 1, width: "100%" }}
            >
               <View style={styles.imageContainer}>
                  <TouchableOpacity onPress={speakLyrics}>
                     <Image
                        source={require("./assets/img/lyriCat.jpg")}
                        style={styles.image}
                     />
                  </TouchableOpacity>
                  <Text style={styles.imageText}>
                     Click me to hear your song!
                  </Text>
               </View>

               <Picker
                  selectedValue={selectedGenre}
                  onValueChange={(itemValue) => setSelectedGenre(itemValue)}
                  style={styles.genrePicker}
               >
                  <Picker.Item label="Select a genre..." value="" />
                  <Picker.Item label="Acoustic" value="acoustic" />
                  <Picker.Item label="Alternative Rock" value="alternative" />
                  <Picker.Item label="Blues" value="blues" />
                  <Picker.Item label="Classical" value="classical" />
                  <Picker.Item label="Country" value="country" />
                  <Picker.Item label="Dance Music" value="dance" />
                  <Picker.Item label="Disco" value="disco" />
                  <Picker.Item label="Electronic Music" value="electronic" />
                  <Picker.Item label="Folk" value="folk" />
                  <Picker.Item label="Gospel" value="gospel" />
                  <Picker.Item label="Heavy Metal" value="metal" />
                  <Picker.Item label="Hip Hop" value="hiphop" />
                  <Picker.Item label="Indie" value="indie" />
                  <Picker.Item label="Jazz" value="jazz" />
                  <Picker.Item label="Latin" value="latin" />
                  <Picker.Item label="New Wave" value="wave" />
                  <Picker.Item label="Opera" value="opera" />
                  <Picker.Item label="Pop" value="pop" />
                  <Picker.Item label="Punk" value="punk" />
                  <Picker.Item label="R&B" value="rnb" />
                  <Picker.Item label="Reggae" value="reggae" />
                  <Picker.Item label="Rock" value="rock" />
                  <Picker.Item label="Soul" value="soul" />
                  <Picker.Item label="Haiku" value="haiku" />
                  <Picker.Item label="Ballad" value="ballad" />
                  <Picker.Item label="Elegy" value="elegy" />
                  <Picker.Item label="Free Verse" value="freeverse" />
                  <Picker.Item label="Haiku" value="haiku" />
                  <Picker.Item label="Limerick" value="limerick" />
                  <Picker.Item label="Ode" value="ode" />
                  <Picker.Item label="Sonnet" value="sonnet" />
                  <Picker.Item label="Villanelle" value="villanelle" />

                  {/* Add more genres as needed */}
               </Picker>
               <Text
                  style={{
                     fontSize: 18,
                     marginBottom: 10,
                     textAlign: "center",
                  }}
               >
                  Enter a Topic to Generate Your Song!
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
            </TouchableOpacity>
         </KeyboardAwareScrollView>
      </LinearGradient>
   );
}
