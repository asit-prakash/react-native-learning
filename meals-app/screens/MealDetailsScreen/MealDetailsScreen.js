import React from "react";
import { View, Text } from "react-native";
import styles from "./MealDetailsScreenStyles";
import { MEALS } from "../../data/dummyData";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton/CustomHeaderButton";

const MealDetailsScreen = (props) => {
  const mealId = props.navigation.getParam("mealId");

  const selectedMeal = MEALS.find((meal) => mealId === meal.id);

  return (
    <View>
      <Text>{selectedMeal.title}</Text>
    </View>
  );
};

MealDetailsScreen.navigationOptions = {
  headerTitle: "test",
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Favourite"
        iconName="ios-star"
        onPress={() => {
          console.log("fav pressed");
        }}
      />
    </HeaderButtons>
  ),
};

export default MealDetailsScreen;
