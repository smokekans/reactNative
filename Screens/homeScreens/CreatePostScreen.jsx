import React, { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { storage, db } from "../../firebase/config";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import {
  View,
  StyleSheet,
  Pressable,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

const initialState = {
  name: "",
  location: "",
};

function CreatePostScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);
  const [location, setLocation] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const isInputFocused = (inputName) => focusedInput === inputName;

  const handleInputFocus = (inputName) => {
    setIsShowKeyboard(true);
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setIsShowKeyboard(false);
    setFocusedInput(null);
  };

  const retakePhoto = () => {
    setPhoto(null);
  };

  const takePhotoCamera = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setPhoto(uri);
    }
  };

  const toogleCameraType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const takePhotoGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setPhoto(result.uri);
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const cleanPost = () => {
    setPhoto(null);
    setState({ name: "", location: "" });
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("====================================");
          console.log("Permission to access location was denied");
          console.log("====================================");
        }

        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
      } catch (error) {
        console.log("====================================");
        console.log("Error getting location", error);
        console.log("====================================");
      }
    };
    getLocation();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

conts takePg

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.containerCamera}>
          <Camera style={styles.camera} type={type} ref={setCameraRef}>
            <View style={styles.containerCameraCam}>
              {photo && (
                <View
                  style={{
                    ...styles.takePhoto,
                  }}
                >
                  <Image
                    source={{ uri: photo }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </View>
              )}
            </View>
          </Camera>
          <View style={styles.containerListIcon}>
            {!photo ? (
              <>
                <Pressable
                  style={styles.containerIcon}
                  onPress={takePhotoGallery}
                >
                  <AntDesign name="picture" size={24} color="#ffffff" />
                  <Text style={styles.titleIcon}>Обрати фото з галереї</Text>
                </Pressable>
                <Pressable
                  style={styles.containerIcon}
                  onPress={takePhotoCamera}
                >
                  <AntDesign name="camerao" size={24} color="#ffffff" />
                  <Text style={styles.titleIcon}>Зробити фото</Text>
                </Pressable>
                <Pressable
                  style={styles.containerIcon}
                  onPress={toogleCameraType}
                >
                  <AntDesign name="sync" size={24} color="#ffffff" />
                  <Text style={styles.titleIcon}>Змінити камеру</Text>
                </Pressable>
              </>
            ) : (
              <Pressable style={styles.containerIcon} onPress={retakePhoto}>
                <AntDesign name="reload1" size={24} color="#ffffff" />
                <Text style={styles.titleIcon}>Змінити фото</Text>
              </Pressable>
            )}
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <View
          // style={{
          //   paddingBottom: isShowKeyboard ? 50 : 400,
          // }}
          >
            <View style={styles.containerInput}>
              <View>
                <TextInput
                  style={[
                    styles.inputName,
                    isInputFocused("name") && styles.inputFocused,
                  ]}
                  placeholder="Назва..."
                  placeholderTextColor="#BDBDBD"
                  cursorColor="#BDBDBD"
                  selectionColor="#555555"
                  value={state.name}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, name: value }))
                  }
                  onFocus={() => {
                    handleInputFocus("name");
                    setIsShowKeyboard(true);
                  }}
                  onBlur={handleInputBlur}
                />
              </View>
              <View style={styles.containerInputLocation}>
                <EvilIcons name="location" size={24} color="#BDBDBD" />
                <TextInput
                  style={[
                    styles.inputLocation,
                    isInputFocused("location") && styles.inputFocused,
                  ]}
                  placeholder="Місцевість..."
                  placeholderTextColor="#BDBDBD"
                  cursorColor="#BDBDBD"
                  selectionColor="#555555"
                  value={location}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, location: value }))
                  }
                  onFocus={() => {
                    handleInputFocus("location");
                    setIsShowKeyboard(true);
                  }}
                  onBlur={handleInputBlur}
                />
              </View>
            </View>
            <View>
              <Pressable style={styles.button} onPress={toogleCameraType}>
                <Text style={styles.buttonText}>Опублікувати</Text>
              </Pressable>
            </View>
            <View style={styles.containerButtonTrash}>
              <Pressable style={styles.buttonTrash} onPress={cleanPost}>
                <AntDesign name="delete" size={24} color="#ffffff" />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  containerCamera: { paddingTop: 32, width: "100%" },
  camera: { width: "100%", height: 250 },
  containerCameraCam: {},
  takePhoto: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
  },
  containerListIcon: {
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: "10",
  },
  containerIcon: {
    alignItems: "center",
    backgroundColor: "#FF6C00",
    color: "#ffffff",
    borderRadius: 100,
    flexDirection: "row",
    height: 40,
    paddingHorizontal: 12,
  },
  titleIcon: {
    fontFamily: "Roboto-400",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
    color: "#ffffff",
    maxWidth: 60,
    marginHorizontal: 3,
  },
  containerInput: {
    gap: 16,
    paddingVertical: 32,
  },
  inputName: {
    paddingVertical: 16,
    width: "100%",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontFamily: "Roboto-400",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#000000",
    height: 50,
  },
  inputFocused: {
    borderBottomColor: "#FF6C00",
  },
  inputLocation: {
    padding: 16,
    paddingLeft: 32,
    width: "100%",
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    fontFamily: "Roboto-400",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#000000",
    height: 50,
    position: "absolute",
  },
  containerInputLocation: {
    flexDirection: "row",
    alignItems: "center",
    position: "reletive",
  },
  button: {
    width: "100%",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 16,
  },
  buttonText: {
    fontFamily: "Roboto-400",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#ffffff",
  },
  containerButtonTrash: {
    marginTop: 32,
    alignItems: "center",
  },
  buttonTrash: {
    backgroundColor: "#FF6C00",
    padding: 16,
    borderRadius: 100,
  },
});

export default CreatePostScreen;
