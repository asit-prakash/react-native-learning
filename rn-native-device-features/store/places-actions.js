import * as FileSystem from "expo-file-system";
import { insertPlace, getPlaces } from "../helpers/database";

export const ADD_PLACE = "ADD_PLACE";
export const GET_PLACES = "GET_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newpath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newpath,
      });
      const dbResult = await insertPlace(
        title,
        newpath,
        "dummy address",
        12.7,
        25.8
      );
      dispatch({
        type: ADD_PLACE,
        placeData: { id: dbResult.insertId, title: title, image: newpath },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const getAllPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await getPlaces();
      dispatch({ type: GET_PLACES, places: dbResult.rows._array });
    } catch (error) {
      throw error;
    }
  };
};
