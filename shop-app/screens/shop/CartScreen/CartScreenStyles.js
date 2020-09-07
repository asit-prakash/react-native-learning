import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../constants/colors/colors";

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.neutralLighter,
  },
  cartTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "white",
  },
  cartTotalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderButtonContainer: {},
});
export default styles;
