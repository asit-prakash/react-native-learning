import Order from "../../../models/orders";

export const ADD_ORDER = "ADD_ORDER";
export const GET_ALL_ORDERS = "GET_ALL_ORDERS";

export const getAllOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-shop-app-2516a.firebaseio.com/orders/u1.json",
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

      const allOrders = [];
      for (let key in resData) {
        allOrders.push(
          new Order(key, resData[key].items, resData[key].amount, new Date())
        );
      }

      dispatch({ type: GET_ALL_ORDERS, orders: allOrders });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItems, cartTotal) => {
  return async (dispatch) => {
    const date = new Date();

    //can execute async code here
    const response = await fetch(
      "https://rn-shop-app-2516a.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          amount: cartTotal,
          date: date.toISOString,
        }),
      }
    );
    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: cartTotal,
        date: date,
      },
    });
  };
};
