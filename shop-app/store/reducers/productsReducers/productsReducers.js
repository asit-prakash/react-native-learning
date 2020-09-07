import PRODUCTS from "../../../data/dummy-data";
import Product from "../../../models/product";
import {
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  GET_PRODUCTS,
} from "../../actions/productsActions/productsActions";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products,
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.productId
        ),
      };

    case UPDATE_PRODUCT:
      const userProductIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.productId
      );

      const updatedProduct = new Product(
        action.productId,
        state.userProducts[userProductIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[userProductIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.productId
      );

      const updatedAvailabeProducts = [...state.availableProducts];
      updatedAvailabeProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailabeProducts,
        userProducts: updatedUserProducts,
      };

    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        "u1",
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
  }

  return state;
};

export default productsReducer;
