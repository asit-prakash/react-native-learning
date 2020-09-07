import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

const GoalInput = (props) => {
  const [goal, setGoal] = useState("");

  const goalChangeHandler = (inputGoal) => {
    setGoal(inputGoal);
  };

  const addGoalHandler = () => {
    props.onAddGoal(goal);
    setGoal("");
  };

  return (
    <Modal visible={props.visible} animationType="fade">
      <View>
        <TextInput
          style={styles.textInputContainer}
          placeholder="Course Goal"
          onChangeText={goalChangeHandler}
          value={goal}
        />
        <Button title="Cancel" color="red" onPress={props.onCancel} />
        <Button title="Add" onPress={addGoalHandler} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    borderColor: "black",
    borderWidth: 1,
  },
});

export default GoalInput;
