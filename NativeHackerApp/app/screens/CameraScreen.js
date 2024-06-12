import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import COLORS from "../constants/colors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function CameraScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null); // State to store the captured photo URI
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    console.log("Taking picture...");
    const options = { quality: 0.5, base64: true };
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync(options);
        console.log("Photo taken:", photo);
        console.log("-----------------------")
        console.log(photo.uri);
        setPhotoUri(photo.uri); // Store the captured photo URI in the state
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    } else {
      console.warn("Camera reference is null.");
    }
  };

  const retakePicture = () => {
    setPhotoUri(null); // Reset the captured photo URI to show the camera again
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.container}>
          <Image source={{ uri: photoUri }} style={styles.capturedPhoto} />
          <Button title="Retake Photo" onPress={retakePicture} />
        </View>
      ) : (
        <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
  },
  capturedPhoto: {
    width: width,
    height: height*0.85,
  },
});
