import React from "react";
import { View, Text, Button } from "react-native";
import styles from "../StartGame/StartGameStyles";

const GameOver = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!!</Text>
      <Text>in {props.rounds} rounds </Text>
      <Button title="New Game" onPress={props.newGame} />
    </View>
  );
};

export default GameOver;
