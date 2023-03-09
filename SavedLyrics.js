import React, { useState } from "react";
import {
   View,
   Text,
   ScrollView,
   TextInput,
   Button,
   Clipboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";

export default function SavedLyrics({ route }) {
   const [newLyrics, setNewLyrics] = useState("");
   const [savedLyrics, setSavedLyrics] = useState(
      route?.params?.savedLyrics || []
   );

   function handleSaveLyrics() {
      setNewLyrics(""); // clear the input field
      if (newLyrics) {
         setSavedLyrics([...savedLyrics, newLyrics]); // save the new lyrics
      }
   }

   function handlePasteLyrics() {
      Clipboard.getString().then((text) => setNewLyrics(text));
   }

   return (
      <LinearGradient
         colors={["#C6E1F7", "#CEE5F2"]}
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 1 }}
         style={styles.container}
      >
         <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
               <Text style={{ fontSize: 20, marginBottom: 10 }}>
                  Saved Lyrics
               </Text>
               {savedLyrics.map((lyrics, index) => (
                  <View style={styles.savedLyricsContainer} key={index}>
                     <Text style={styles.savedLyrics}>{lyrics}</Text>
                  </View>
               ))}
               <TextInput
                  value={newLyrics}
                  onChangeText={(text) => setNewLyrics(text)}
                  placeholder="Paste your lyrics here"
                  style={styles.input}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
               />
               <View style={{ flexDirection: "row" }}>
                  <Button title="Save" onPress={handleSaveLyrics} />
                  <Button title="Paste" onPress={handlePasteLyrics} />
               </View>
            </View>
         </ScrollView>
      </LinearGradient>
   );
}
