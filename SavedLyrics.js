import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function SavedLyrics({ route }) {
   const { savedLyrics } = route.params;

   return (
      <ScrollView>
         <View>
            {savedLyrics.map((lyrics, index) => (
               <View key={index}>
                  <Text style={{ fontSize: 18 }}>{lyrics}</Text>
               </View>
            ))}
         </View>
      </ScrollView>
   );
}
