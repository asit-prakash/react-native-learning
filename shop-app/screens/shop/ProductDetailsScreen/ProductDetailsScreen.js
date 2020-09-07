import React from "react";
import { View, Text, ScrollView, Button, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ProductDetailsScreenStyles";
import * as cartActions from "../../../store/actions/cartActions/cartActions";

const ProductDetailsScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.availableProducts.find((item) => item.id === productId)
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: product.imageUrl }} style={styles.image} />
          </View>
          <View>
            <View style={styles.cardBody1}>
              <Text>$ {product.price}</Text>
              <Button
                title="Add to Cart"
                onPress={() => {
                  dispatch(cartActions.addToCart(product));
                }}
              />
            </View>
            <View style={styles.cardBody2}>
              <Text>Description</Text>
              <Text style={styles.itemDescription}>{product.description}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

ProductDetailsScreen.navigationOptions = (navData) => {
  const productTitle = navData.navigation.getParam("productTitle");
  return {
    headerTitle: productTitle,
  };
};
export default ProductDetailsScreen;
