import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LyricGenerator from "./LyricGenerator";
import SavedLyrics from "./SavedLyrics";

const Tab = createBottomTabNavigator();

export default function App() {
   return (
      <NavigationContainer>
         <Tab.Navigator>
            <Tab.Screen
               name="LyricGenerator"
               component={LyricGenerator}
               options={{ headerShown: false }}
            />
            <Tab.Screen name="Saved Lyrics" component={SavedLyrics} />
         </Tab.Navigator>
      </NavigationContainer>
   );
}
