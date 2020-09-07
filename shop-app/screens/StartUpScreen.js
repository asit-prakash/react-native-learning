import React, { useEffect } from "react";
import { View, Text, AsyncStorage, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/authActions/authActions";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }
      const tokenExpiryTime = expirationDate.getTime() - new Date().getTime();
      dispatch(authActions.authenticate(userId, token, tokenExpiryTime));
      props.navigation.navigate("Shop");
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};
export default StartUpScreen;
