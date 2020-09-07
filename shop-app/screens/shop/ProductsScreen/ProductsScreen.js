import React, { useEffect, useState, useCallback } from "react";
import { FlatList, View, Button, ActivityIndicator, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../../components/shop/ProductItem/ProductItem";
import styles from "./ProductsScreenStyles";
import * as cartActions from "../../../store/actions/cartActions/cartActions";
import CustomHeaderButton from "../../../components/UI/CustomHeaderButton/CustomHeaderButton";
import * as ProductsActions from "../../../store/actions/productsActions/productsActions";

const ProductsScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRfreshing, setIsRfreshing] = useState(false);

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRfreshing(true);
    // setIsLoading(true);
    try {
      await dispatch(ProductsActions.getAllProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRfreshing(false);

    // setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  //to re render a page every time i visit
  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [dispatch, loadProducts]);

  const onSelectHandler = (id, title) => {
    props.navigation.navigate({
      routeName: "ProductDetails",
      params: { productId: id, productTitle: title },
    });
  };

  if (error) {
    return (
      <View style={styles.loading}>
        <Text>An error occured</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRfreshing}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            prodImage={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() =>
              onSelectHandler(itemData.item.id, itemData.item.title)
            }
          >
            <Button
              title={"View Details"}
              onPress={() =>
                onSelectHandler(itemData.item.id, itemData.item.title)
              }
            />
            <Button
              title={"Add to Cart"}
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
            />
          </ProductItem>
        )}
        contentContainerStyle={
          {
            // flexGrow: 1,
          }
        }
      />
    </View>
  );
};

ProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName="md-cart"
          onPress={() => navData.navigation.navigate({ routeName: "Cart" })}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsScreen;
