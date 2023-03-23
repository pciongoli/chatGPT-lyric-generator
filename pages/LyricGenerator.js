import React, { useState, useEffect } from "react";
import {
   View,
   Text,
   Clipboard,
   ActivityIndicator,
   TouchableOpacity,
   Keyboard,
   Animated,
   Easing,
} from "react-native";
import * as Speech from "expo-speech";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import getAiResponse from "../getAiResponse";
import styles from "../styles";
import { LinearGradient } from "expo-linear-gradient";
import { OPENAI_API_KEY } from "@env";
import * as Font from "expo-font";
import AnimatedImage from "../components/AnimatedImage";
import GenrePicker from "../components/GenrePicker";
import LyricsInput from "../components/LyricsInput";
import GeneratedLyrics from "../components/GeneratedLyrics";

export default function LyricGenerator({ navigation }) {
   const [prompt, setPrompt] = useState("");
   const [generatedLyrics, setGeneratedLyrics] = useState("");
   const [isEditingLyrics, setIsEditingLyrics] = useState(false);
   const [loading, setLoading] = useState(false);
   const [selectedGenre, setSelectedGenre] = useState("Pop");
   const [fontsLoaded, setFontsLoaded] = useState(false);
   const [opacityAnim] = useState(new Animated.Value(1));

   useEffect(() => {
      async function loadFonts() {
         await Font.loadAsync({
            ShantellSans: require("../assets/fonts/ShantellSans-Regular.ttf"),
         });
         setFontsLoaded(true);
      }
      loadFonts();
   }, []);

   if (!fontsLoaded) {
      return <ActivityIndicator size="large" color="#ffffff" />;
   }

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

   function startAnimationLoop() {
      Animated.sequence([
         Animated.timing(opacityAnim, {
            toValue: 0.5,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
         }),
         Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
         }),
      ]).start(() => {
         if (!speechStopped) {
            startAnimationLoop();
         }
      });
   }

   let speechStopped = false;

   async function speakLyrics() {
      const isSpeaking = await Speech.isSpeakingAsync();

      if (isSpeaking) {
         speechStopped = true;
         Speech.stop();
         Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
         }).start();
      } else {
         speechStopped = false;
         startAnimationLoop();
         Speech.speak(generatedLyrics, {
            onDone: () => {
               speechStopped = true;
               Animated.timing(opacityAnim, {
                  toValue: 1,
                  duration: 500,
                  easing: Easing.linear,
                  useNativeDriver: true,
               }).start();
            },
         });
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
                  <AnimatedImage
                     opacityAnim={opacityAnim}
                     speakLyrics={speakLyrics}
                  />
               </View>

               <GenrePicker
                  selectedGenre={selectedGenre}
                  setSelectedGenre={setSelectedGenre}
               />

               <LyricsInput
                  prompt={prompt}
                  setPrompt={setPrompt}
                  handleEndEditingLyrics={handleEndEditingLyrics}
                  handleGenerateLyrics={handleGenerateLyrics}
               />

               {loading ? (
                  <ActivityIndicator size="large" color="#ffffff" />
               ) : (
                  <GeneratedLyrics
                     isEditingLyrics={isEditingLyrics}
                     generatedLyrics={generatedLyrics}
                     setGeneratedLyrics={setGeneratedLyrics}
                     handleEditLyrics={handleEditLyrics}
                     handleCopyLyrics={handleCopyLyrics}
                  />
               )}
            </TouchableOpacity>
         </KeyboardAwareScrollView>
      </LinearGradient>
   );
}
