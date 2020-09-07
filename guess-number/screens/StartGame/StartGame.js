import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from "react-native";
import styles from "./StartGameStyles";
import Card from "../../components/Card/Card";
import InputText from "../../components/InputText/InputText";

const StartGame = (props) => {
  const [enteredValue, setEnteredValue] = useState("");

  const [confirmInput, setConfirmInput] = useState(false);

  const [inputNumber, setInputNumber] = useState();

  const inputChangeHandler = (input) => {
    setEnteredValue(input.replace(/[^0-9]/g, ""));
  };

  const dismissKeyboardHandler = () => {
    Keyboard.dismiss();
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmInput(false);
    dismissKeyboardHandler();
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Input", "Input a number between 1 and 99", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmInput(true);
    setEnteredValue("");
    setInputNumber(chosenNumber);
    dismissKeyboardHandler();
  };

  let confirmedOutput;

  if (confirmInput) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected {inputNumber}</Text>
        <Button
          title="Start Game"
          onPress={() => props.onStartGame(inputNumber)}
        />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboardHandler}>
      <View style={styles.container}>
        <Text style={styles.title}>Start a New Game!!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a number</Text>
          <InputText
            style={styles.input}
            placeholder={"Enter number"}
            keyboardType={"numeric"}
            maxLength={2}
            onChangeText={inputChangeHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Reset" onPress={resetInputHandler} />
            </View>
            <View style={styles.button}>
              <Button title="Confirm" onPress={confirmInputHandler} />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StartGame;
