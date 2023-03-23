import React from "react";
import { TouchableOpacity, Animated, Text } from "react-native";
import styles from "../styles";

export default function AnimatedImage({ opacityAnim, speakLyrics }) {
   return (
      <React.Fragment>
         <TouchableOpacity onPress={speakLyrics}>
            <Animated.Image
               source={require("../assets/img/lyriCat.jpg")}
               style={[
                  styles.image,
                  {
                     opacity: opacityAnim,
                  },
               ]}
            />
         </TouchableOpacity>
         <Text style={styles.imageText}>Click me to hear your song!</Text>
      </React.Fragment>
   );
}
