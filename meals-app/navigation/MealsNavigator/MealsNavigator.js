import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "react-navigation-drawer";

import CategoriesScreen from "../../screens/CategoriesScreen/CategoriesScreen";
import CategoryMealsScreen from "../../screens/CategoryMealsScreen/CategoryMealsScreen";
import MealDetailsScreen from "../../screens/MealDetailsScreen/MealDetailsScreen";
import FavouriteScreen from "../../screens/FavouriteScreen/FavouriteScreen";
import FiltersScreen from "../../screens/FiltersScreen/FiltersScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: "yellow",
  },
};

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetails: MealDetailsScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavNavigator = createStackNavigator(
  {
    Favourites: FavouriteScreen,
    MealDetails: MealDetailsScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MealsFavTabNavigator = createBottomTabNavigator(
  {
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Favourites: {
      screen: FavNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "yellow",
    },
  }
);

const FiltersNavigator = createStackNavigator({ Filters: FiltersScreen });

const sideBarNavigator = createDrawerNavigator({
  MealsFav: {
    screen: MealsFavTabNavigator,
    navigationOptions: { drawerLabel: "Fav Meals" },
  },
  Filters: FiltersNavigator,
});

export default createAppContainer(sideBarNavigator);
