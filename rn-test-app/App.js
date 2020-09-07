import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

const App = () => {
  const [newGoals, setNewGoal] = useState([]);

  const [goalInput, setGoalInput] = useState(false);

  const addGoalHandler = (goal) => {
    setNewGoal((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goal },
    ]);
    setGoalInput(false);
  };

  const onCancelGoalAddHandler = () => {
    setGoalInput(false);
  };

  const removeGoalHandler = (goalId) => {
    setNewGoal((currentGoals) => {
      return currentGoals.filter((goal) => goal.id != goalId);
    });
  };

  return (
    <View style={styles.screen}>
      <Button
        title="Add New Goal"
        onPress={() => {
          setGoalInput(true);
        }}
      />
      <GoalInput
        visible={goalInput}
        onAddGoal={addGoalHandler}
        onCancel={onCancelGoalAddHandler}
      />
      <ScrollView>
        {newGoals.map((goal, index) => (
          <GoalItem
            key={index}
            id={goal.id}
            item={goal.value}
            onDelete={removeGoalHandler}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 30,
  },
});

export default App;
