import React from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import styles from "./CategoryMealsScreenStyles";
import { CATEGORIES, MEALS } from "../../data/dummyData";

const CategoryMealsScreen = (props) => {
  const categoryId = props.navigation.getParam("categoryId");
  // const selectedCat = CATEGORIES.find((cat) => cat.id === categoryId);

  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );

  const renderMealItem = (itemData) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({
            routeName: "MealDetails",
            params: { mealId: itemData.item.id },
          });
        }}
      >
        <View>
          <View>
            <Text>{itemData.item.title}</Text>
          </View>
          <View></View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const categoryId = navigationData.navigation.getParam("categoryId");
  const selectedCat = CATEGORIES.find((cat) => cat.id === categoryId);

  return {
    headerTitle: selectedCat.title,
  };
};

export default CategoryMealsScreen;
