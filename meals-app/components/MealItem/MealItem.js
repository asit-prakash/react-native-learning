import React from "react";
import { View, Text, FlatList } from "react-native";

const MealItem = (props) => {
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
export default MealItem;
