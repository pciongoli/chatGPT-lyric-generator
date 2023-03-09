import { StyleSheet } from "react-native";

export default StyleSheet.create({
   container: {
      flex: 1,
   },
   scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      marginTop: 80, // equal to the height of the title
      paddingBottom: 100, // add padding to the bottom of the ScrollView
   },
   titleContainer: {
      position: "absolute",
      top: 55,
      left: 0,
      right: 0,
      alignItems: "center",
      height: 80, // height of the title
   },
   title: {
      fontSize: 36, // increased font size
      fontWeight: "bold",
      color: "#8A2BE2",
      textShadowColor: "#8A2BE2", // added text shadow
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
   },
   image: {
      width: "50%",
      height: 200,
      resizeMode: "contain",
      marginBottom: 20,
   },
   input: {
      marginTop: 20,
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: "#8A2BE2",
      borderRadius: 10,
      width: "100%",
      color: "#8A2BE2",
      fontSize: 18,
   },
   generatedLyrics: {
      marginTop: 10,
      textAlign: "center",
      color: "#8A2BE2",
      fontSize: 18,
   },
   button: {
      color: "blue",
   },
});
