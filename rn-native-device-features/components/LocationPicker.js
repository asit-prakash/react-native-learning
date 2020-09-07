import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView, { Marker } from "react-native-maps";

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState();

  const mapPickedLocation = props.navigation.getParam("pickedLocation");

  let mapRegion;
  let markerCoordinates;

  if (mapPickedLocation) {
    mapRegion = {
      latitude: mapPickedLocation.lat,
      longitude: mapPickedLocation.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    markerCoordinates = {
      latitude: mapPickedLocation.lat,
      longitude: mapPickedLocation.lng,
    };
    props.onLocationPicked(mapPickedLocation);
  }

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert("Permission needed", "You need to grant camera permission", [
        { text: "Okay" },
      ]);
      return false;
    }
    return true;
  };

  const locationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      });
    } catch (error) {
      Alert.alert("Could not fetch location", "Try adding using maps", [
        { text: "Okay" },
      ]);
    }
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View>
      <Text>No Location Chosen yet</Text>
      {mapPickedLocation && (
        <MapView style={{ width: 300, height: 300 }} region={mapRegion}>
          <Marker title="Picked Location" coordinate={markerCoordinates} />
        </MapView>
      )}
      <View>
        <Button title="Add Location" onPress={locationHandler} />
        <Button title="Pick on map" onPress={pickOnMapHandler} />
      </View>
    </View>
  );
};
export default LocationPicker;
