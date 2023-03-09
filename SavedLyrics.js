import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";

export default function SavedLyrics({ route }) {
   const savedLyrics = route?.params?.savedLyrics || [];

   return (
      <LinearGradient
         colors={["#C33764", "#1D2671"]}
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 1 }}
         style={styles.container}
      >
         <ScrollView contentContainerStyle={styles.scrollContainer}>
            {savedLyrics.length > 0 ? (
               <View>
                  {savedLyrics.map((lyrics, index) => (
                     <View key={index}>
                        <Text style={styles.generatedLyrics}>{lyrics}</Text>
                     </View>
                  ))}
               </View>
            ) : (
               <Text>You have no saved lyrics yet</Text>
            )}
         </ScrollView>
      </LinearGradient>
   );
}
