import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const GoalItem = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onDelete.bind(this, props.id)}
    >
      <View>
        <Text>{props.item}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoalItem;
