import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../../components/shop/OrderItem/OrderItem";
import * as orderActions from "../../../store/actions/ordersActions/ordersActions";


const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderActions.getAllOrders());
  }, [dispatch]);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.date}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = {
  headerTitle: "Your Orders",
};

export default OrdersScreen;
