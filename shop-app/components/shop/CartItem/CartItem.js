import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
      }}
    >
      <Text>{props.title}</Text>
      <Text>{props.price}</Text>
      <Text>{props.quantity}</Text>
      {props.deletable && (
        <TouchableOpacity onPress={props.onRemove}>
          <Ionicons name="md-trash" size={23} />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default CartItem;
