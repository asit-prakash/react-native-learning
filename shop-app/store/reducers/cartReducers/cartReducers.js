import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../../actions/cartActions/cartActions";
import CartItem from "../../../models/cart-item";
import { ADD_ORDER } from "../../actions/ordersActions/ordersActions";
import { DELETE_PRODUCT } from "../../actions/productsActions/productsActions";

const initialState = {
  items: {},
  cartPrice: 0,
};

const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productTitle = addedProduct.title;
      const productPrice = addedProduct.price;

      let updateCart;

      if (state.items[addedProduct.id]) {
        //item exists in cart
        updateCart = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        updateCart = new CartItem(1, productPrice, productTitle, productPrice);
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updateCart },
        cartPrice: state.cartPrice + productPrice,
      };

    case REMOVE_FROM_CART:
      const currentProduct = state.items[action.productId];
      const currentQty = currentProduct.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          currentProduct.quantity - 1,
          currentProduct.productPrice,
          currentProduct.productTitle,
          currentProduct.sum - currentProduct.productPrice
        );

        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        cartPrice: state.cartPrice - currentProduct.productPrice,
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const updatedItemTotal = state.items[action.productId].sum;
      delete updatedItems[action.productId];
      return {
        ...state,
        items: updatedItems,
        cartPrice: state.cartPrice - updatedItemTotal,
      };
  }

  return state;
};
export default cartReducers;
