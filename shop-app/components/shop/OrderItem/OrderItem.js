import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import CartItem from "../CartItem/CartItem";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View>
      <Text>{props.amount}</Text>
      <Text>{props.date.toString()}</Text>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View>
          {props.items.map((item, index) => {
            return (
              <CartItem
                key={index}
                title={item.productTitle}
                quantity={item.quantity}
                price={item.sum}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};
export default OrderItem;
