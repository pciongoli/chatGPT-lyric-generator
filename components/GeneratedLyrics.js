import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "../styles";

export default function GeneratedLyrics({
   isEditingLyrics,
   generatedLyrics,
   setGeneratedLyrics,
   handleEditLyrics,
   handleCopyLyrics,
}) {
   if (generatedLyrics === "") return null;

   return (
      <React.Fragment>
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
               <Text style={styles.generatedLyrics} onPress={handleEditLyrics}>
                  {generatedLyrics}
               </Text>
               <TouchableOpacity
                  style={styles.button}
                  onPress={handleCopyLyrics}
               >
                  <Text style={styles.buttonText}>Copy</Text>
               </TouchableOpacity>
            </View>
         )}
      </React.Fragment>
   );
}
