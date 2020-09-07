import React, { useState } from "react";
import { View, Text, Button, Alert, Image } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImageSelector = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA);
    if (result.status !== "granted") {
      Alert.alert("Permission needed", "You need to grant camera permission", [
        { text: "Okay" },
      ]);
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermision = await verifyPermissions();
    if (!hasPermision) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View>
      <View>
        {!pickedImage ? (
          <Text>No Image Picked Yet</Text>
        ) : (
          <Image
            source={{ uri: pickedImage }}
            style={{ width: 400, height: 200 }}
          />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};
export default ImageSelector;
