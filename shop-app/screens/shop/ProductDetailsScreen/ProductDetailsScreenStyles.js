import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../constants/colors/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutralLighter,
  },
  card: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  imageContainer: {
    width: "100%",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width / 2,
  },
  cardBody1: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
  },
  cardBody2: { marginHorizontal: 15 },
  itemDescription: { marginVertical: 10 },
});
export default styles;
