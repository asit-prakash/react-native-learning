import React from "react";
import { View, FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../../components/shop/ProductItem/ProductItem";
import * as productsActions from "../../../store/actions/productsActions/productsActions";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../../components/UI/CustomHeaderButton/CustomHeaderButton";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const onEditHandler = (id) => {
    props.navigation.navigate({
      routeName: "EditProducts",
      params: { productId: id },
    });
  };

  const onDeleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "NO", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  return (
    <View>
      <FlatList
        data={userProducts}
        renderItem={(itemData) => (
          <ProductItem
            prodImage={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              onEditHandler(itemData.item.id);
            }}
          >
            <Button
              title="Edit"
              onPress={() => {
                onEditHandler(itemData.item.id);
              }}
            />
            <Button
              title="Delete"
              onPress={() => onDeleteHandler(itemData.item.id)}
            />
          </ProductItem>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Product"
          iconName="md-create"
          onPress={() =>
            navData.navigation.navigate({ routeName: "EditProducts" })
          }
        />
      </HeaderButtons>
    ),
  };
};
export default UserProductsScreen;
