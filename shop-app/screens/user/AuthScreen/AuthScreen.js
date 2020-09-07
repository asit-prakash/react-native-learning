import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import * as authActions from "../../../store/actions/authActions/authActions";

const AuthScreen = (props) => {
  const dispatch = useDispatch();

  const [isSignup, setIsSignup] = useState(false);

  const [signin, setSignin] = useState({
    email: "",
    password: "",
  });

  const authHandler = () => {
    if (isSignup) {
      dispatch(authActions.signup(signin.email, signin.password)).then(
        props.navigation.navigate("shop")
      );
    } else {
      dispatch(authActions.signin(signin.email, signin.password)).then(
        props.navigation.navigate("Shop")
      );
    }
  };

  const inputChangeHandler = (name, text) => {
    setSignin({ ...signin, [name]: text });
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={10} behavior="padding">
      <ScrollView>
        <View>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => inputChangeHandler("email", text)}
              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry
                onChangeText={(text) => inputChangeHandler("password", text)}
              />
            </View>
          </View>
        </View>
        <Button
          title={isSignup ? "Sign up" : "Sign in"}
          onPress={authHandler}
        />
        <Button
          title={isSignup ? "Switch to Sign in" : "Switch to Sign up"}
          onPress={() => setIsSignup((prevState) => !prevState)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default AuthScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
