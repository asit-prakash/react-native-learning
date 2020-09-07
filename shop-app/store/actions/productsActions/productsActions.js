import Product from "../../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-shop-app-2516a.firebaseio.com/products.json",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      const resData = await response.json();

      const allProducts = [];
      for (let key in resData) {
        allProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({ type: GET_PRODUCTS, products: allProducts });
    } catch (error) {
      throw error;
    }
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    //can execute async code here
    const response = await fetch(
      "https://rn-shop-app-2516a.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );
    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    //can execute async code here
    await fetch(
      `https://rn-shop-app-2516a.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    //can execute async code here
    await fetch(
      `https://rn-shop-app-2516a.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );
    dispatch({ type: DELETE_PRODUCT, productId: productId });
  };
};
