import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header/Header";
import StartGame from "./screens/StartGame/StartGame";
import Game from "./screens/Game/Game";
import GameOver from "./screens/GameOver/GameOver";

import * as Font from "expo-font";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

// const fetchFonts = () => {
//   return Font.loadAsync({
//     "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
//     "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
//   });
// };

const App = () => {
  const [inputNumber, setInputNumber] = useState();

  const [gameRounds, setGameRounds] = useState(0);

  // const [dataLoaded, setDataLoaded] = useState(false);

  let [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // if (!dataLoaded) {
  //   <AppLoading
  //     startAsync={fetchFonts}
  //     onFinish={() => setDataLoaded(true)}
  //     onError={(err) => {
  //       console.log(err);
  //     }}
  //   />;
  // }

  const newGameHandler = () => {
    setInputNumber(null);
    setGameRounds(0);
  };

  const startGameHandler = (selectedNumber) => {
    setInputNumber(selectedNumber);
    setGameRounds(0);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGameRounds(numberOfRounds);
  };

  let content = <StartGame onStartGame={startGameHandler} />;

  if (inputNumber && gameRounds <= 0) {
    content = <Game userChoice={inputNumber} onGameOver={gameOverHandler} />;
  } else if (gameRounds > 0) {
    content = <GameOver rounds={gameRounds} newGame={newGameHandler} />;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;
