import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import styles from "./ProductItemStyles";

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp onPress={props.onSelect} useForeground>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: props.prodImage }} style={styles.image} />
        </View>
        <View style={styles.itemBody}>
          <View style={styles.itemData}>
            <View>
              <Text>{props.title}</Text>
            </View>
            <View style={styles.itemPrice}>
              <Text>$ {props.price}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>{props.children}</View>
        </View>
      </View>
    </TouchableCmp>
  );
};
export default ProductItem;
