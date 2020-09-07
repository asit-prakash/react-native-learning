import React from "react";
import { TextInput } from "react-native";
import styles from "./InputTextStyles";

const InputText = (props) => {
  return (
    <TextInput  {...props} style={{ ...styles.textInput, ...props.style }} />
  );
};

export default InputText;
