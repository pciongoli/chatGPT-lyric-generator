import React from "react";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles";

export default function GenrePicker({ selectedGenre, setSelectedGenre }) {
   return (
      <Picker
         selectedValue={selectedGenre}
         onValueChange={(itemValue) => setSelectedGenre(itemValue)}
         style={styles.genrePicker}
      >
         <Picker.Item label="Select a genre..." value="" />
         <Picker.Item label="Acoustic" value="acoustic" />
         <Picker.Item label="Alternative Rock" value="alternative" />
         <Picker.Item label="Blues" value="blues" />
         <Picker.Item label="Classical" value="classical" />
         <Picker.Item label="Country" value="country" />
         <Picker.Item label="Dance Music" value="dance" />
         <Picker.Item label="Disco" value="disco" />
         <Picker.Item label="Electronic Music" value="electronic" />
         <Picker.Item label="Folk" value="folk" />
         <Picker.Item label="Gospel" value="gospel" />
         <Picker.Item label="Heavy Metal" value="metal" />
         <Picker.Item label="Hip Hop" value="hiphop" />
         <Picker.Item label="Indie" value="indie" />
         <Picker.Item label="Jazz" value="jazz" />
         <Picker.Item label="Latin" value="latin" />
         <Picker.Item label="New Wave" value="wave" />
         <Picker.Item label="Opera" value="opera" />
         <Picker.Item label="Pop" value="pop" />
         <Picker.Item label="Punk" value="punk" />
         <Picker.Item label="R&B" value="rnb" />
         <Picker.Item label="Reggae" value="reggae" />
         <Picker.Item label="Rock" value="rock" />
         <Picker.Item label="Soul" value="soul" />
         <Picker.Item label="Haiku" value="haiku" />
         <Picker.Item label="Ballad" value="ballad" />
         <Picker.Item label="Elegy" value="elegy" />
         <Picker.Item label="Free Verse" value="freeverse" />
         <Picker.Item label="Haiku" value="haiku" />
         <Picker.Item label="Limerick" value="limerick" />
         <Picker.Item label="Ode" value="ode" />
         <Picker.Item label="Sonnet" value="sonnet" />
         <Picker.Item label="Villanelle" value="villanelle" />
      </Picker>
   );
}
