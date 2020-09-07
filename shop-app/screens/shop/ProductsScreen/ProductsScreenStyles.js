import { StyleSheet } from "react-native";
import colors from "../../../constants/colors/colors";

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.neutralLighter,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default styles;
