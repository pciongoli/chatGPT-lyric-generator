import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
   },
   input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      width: "100%",
   },
   button: {
      marginBottom: 20,
   },
   generatedLyrics: {
      fontSize: 18,
      textAlign: "center",
      marginVertical: 20,
   },
});

export default styles;
