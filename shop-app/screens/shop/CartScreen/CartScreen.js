import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CartScreenStyles";
import CartItem from "../../../components/shop/CartItem/CartItem";
import * as cartActions from "../../../store/actions/cartActions/cartActions";
import * as ordersActions from "../../../store/actions/ordersActions/ordersActions";

const CartScreen = (props) => {
  const cartTotal = useSelector((state) => state.cart.cartPrice);

  const dispatch = useDispatch();

  const getcartItems = useSelector((state) => {
    const cartItems = [];
    for (let key in state.cart.items) {
      cartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return cartItems;
  });

  let CartComponent;

  if (getcartItems.length > 0) {
    CartComponent = (
      <View style={styles.screen}>
        <View style={styles.cartTotal}>
          <View style={styles.cartTotalContainer}>
            <Text>Total: </Text>
            <Text>$ {cartTotal}</Text>
          </View>
          <View style={styles.orderButtonContainer}>
            <Button
              title="Order Now"
              onPress={() =>
                dispatch(ordersActions.addOrder(getcartItems, cartTotal))
              }
            />
          </View>
        </View>
        <FlatList
          data={getcartItems}
          renderItem={(itemData) => (
            <CartItem
              title={itemData.item.productTitle}
              price={itemData.item.productPrice}
              quantity={itemData.item.quantity}
              deletable
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
            />
          )}
          keyExtractor={(item) => item.productId}
        />
      </View>
    );
  } else {
    CartComponent = <Text>Cart is empty</Text>;
  }

  return <View>{CartComponent}</View>;
};

CartScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Cart",
  };
};

export default CartScreen;
