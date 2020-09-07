import { AsyncStorage } from "react-native";

export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const SIGNOUT = "SIGNOUT";

let timer;

export const signout = () => {
  clearSignoutTimer();
  AsyncStorage.removeItem("userData");
  return {
    type: SIGNOUT,
  };
};

const clearSignoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setSignoutTimer = (expirationDate) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(signout());
    }, expirationDate);
  };
};

export const authenticate = (userId, token, expiryTime) => {
  setSignoutTimer(expiryTime);
  return {
    type: AUTHENTICATE,
    userId: userId,
    token: token,
  };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJl54HMsJRr8ioEmyg1KelfVClh5rd27s",
      {
        method: "POST",
        headers: {
          "ConTent-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const resData = await response.json();

    dispatch({ type: SIGNUP, token: resData.idToken, userID: resData.localId });
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJl54HMsJRr8ioEmyg1KelfVClh5rd27s",
      {
        method: "POST",
        headers: {
          "ConTent-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const resData = await response.json();

    dispatch({ type: SIGNIN, token: resData.idToken, userID: resData.localId });
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  //only a string can be saved in async storage
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
