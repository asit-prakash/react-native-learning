import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import MealsNavigator from "./navigation/MealsNavigator/MealsNavigator";
import { enableScreens } from "react-native-screens";

enableScreens(); //for performance optimizations for app with  multiple screens

export default function App() {
  const [loaded] = useFonts({
    SourceSansProRegular: require("./assets/fonts/SourceSansPro-Regular.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return <MealsNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
