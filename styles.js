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
      paddingBottom: 100, // add padding to the bottom of the ScrollView
   },
   titleContainer: {
      position: "relative",
      top: 55,
      left: 0,
      right: 0,
      alignItems: "center",
      justifyContent: "center",
      height: 80, // height of the title
   },

   title: {
      fontSize: 36,
      fontWeight: "bold",
      color: "#8A2BE2",
      textShadowColor: "#8A2BE2",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      alignSelf: "center", // add this line
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
      marginTop: 1,
      textAlign: "center",
      color: "#8A2BE2",
      fontSize: 18,
      marginBottom: 20, // or paddingBottom: 20
   },

   button: {
      color: "blue",
   },
   savedLyricsContainer: {
      marginTop: 20,
      padding: 10,
      backgroundColor: "white",
      borderRadius: 10,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      maxHeight: "70%", // set a maximum height
      overflow: "scroll", // enable scrolling if needed
   },

   savedLyrics: {
      color: "#8A2BE2",
      fontSize: 18,
      textAlign: "center", // center the text horizontally
   },
   addLyricsContainer: {
      marginTop: 20,
      width: "65%",
      alignSelf: "center", // add this line
   },

   addLyricsInput: {
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: "#8A2BE2",
      borderRadius: 10,
      width: "100%",
      color: "#8A2BE2",
      fontSize: 18,
      minHeight: 100,
      textAlignVertical: "top",
      maxWidth: "65%",
      maxHeight: "50%", // adjust this value as needed
   },

   buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      width: "100%",
   },
   button: {
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 10,
      backgroundColor: "#8A2BE2",
      marginRight: 10,
   },
   buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
   },
   pasteButton: {
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 10,
      backgroundColor: "#8A2BE2",
      marginLeft: 10,
   },
   pasteButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
   },
   messageContainer: {
      marginTop: 20,
      padding: 10,
      backgroundColor: "white",
      borderRadius: 10,
      width: "100%",
      alignItems: "center",
   },
   messageText: {
      color: "green",
      fontSize: 18,
   },
});
