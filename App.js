import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import LyricGenerator from "./LyricGenerator";

export default function App() {
   return (
      <SafeAreaView style={styles.container}>
         <LyricGenerator />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
});
