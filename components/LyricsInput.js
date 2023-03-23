import React from "react";
import { TextInput, TouchableOpacity, Text } from "react-native";
import styles from "../styles";

export default function LyricsInput({
   prompt,
   setPrompt,
   handleEndEditingLyrics,
   handleGenerateLyrics,
}) {
   return (
      <React.Fragment>
         <Text style={styles.generateText}>
            Enter a Topic to Generate Your Song!
         </Text>
         <TextInput
            value={prompt}
            onChangeText={(text) => setPrompt(text)}
            placeholder="e.g. Singing Cats"
            style={styles.input}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            onBlur={handleEndEditingLyrics}
         />
         <TouchableOpacity
            style={styles.generateButton}
            onPress={handleGenerateLyrics}
         >
            <Text style={styles.generateButtonText}>Generate Your Song!</Text>
         </TouchableOpacity>
      </React.Fragment>
   );
}
