import React, {
  // useEffect,
  useState,
} from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
  // Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import ImageBG from "../../assets/images/background.jpg";

import { useTogglePasswordVisibility } from "../../hooks/usePasswordVisibilty";

const initialState = {
  email: "",
  password: "",
};

function LoginScreen() {
  const navigation = useNavigation();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  // const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
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

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get("window").width;
  //     setDimensions(width);
  //   };
  //   Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     Dimensions.removeEventListener("change", onChange);
  //   };
  // }, [Dimensions]);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    setState(initialState);
    console.log(state);
    Alert.alert(
      "Credentials",
      `Email: ${state.email}, Password: ${state.password}`
    );
  };

  return (
    <ImageBackground
      source={ImageBG}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <View
            style={{
              ...styles.containerForm,
              marginBottom: isShowKeyboard ? 0 : 0,
              // width: dimensions,
            }}
          >
            <Text style={styles.titleForm}>Увійти</Text>
            <ScrollView>
              <TextInput
                style={[
                  styles.inputForm,
                  isInputFocused("email") && styles.inputFocused,
                ]}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                autoComplete="email"
                cursorColor="#BDBDBD"
                selectionColor="#555555"
                inputMode="email"
                textContentType="emailAddress"
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                onFocus={() => {
                  handleInputFocus("email");
                  setIsShowKeyboard(true);
                }}
                onBlur={handleInputBlur}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.inputPassword,
                    styles.inputForm,
                    isInputFocused("password") && styles.inputFocused,
                  ]}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  autoComplete="new-password"
                  cursorColor="#BDBDBD"
                  selectionColor="#555555"
                  secureTextEntry={passwordVisibility}
                  textContentType="newPassword"
                  autoCorrect={false}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  onFocus={() => {
                    handleInputFocus("password");
                    setIsShowKeyboard(true);
                  }}
                  onBlur={handleInputBlur}
                />
                <Pressable
                  style={styles.iconEye}
                  onPress={handlePasswordVisibility}
                >
                  <Ionicons name={rightIcon} size={22} color="#1B4371" />
                </Pressable>
              </View>
              <Pressable
                style={styles.containerButtonSing}
                onPress={() => navigation.navigate("Posts")}
              >
                <Text style={styles.textButtonSing}>Увійти</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("Registration")}>
                <Text style={styles.textButtonOr}>
                  Немає акаунту? Зареєструватися
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageBackground: { flex: 1, height: "100%" },
  containerForm: {
    flex: 0.65,
    backgroundColor: "white",
    marginTop: "auto",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    padding: 16,
  },
  inputImageContainer: {
    flexDirection: "row",
  },
  imageForm: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top: -75,
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
  },
  iconAdd: {
    position: "absolute",
    left: "62%",
  },
  titleForm: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginVertical: 32,
  },
  inputForm: {
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#000000",
    marginBottom: 16,
    height: 50,
    padding: 16,
  },
  inputFocused: {
    borderColor: "#FF6C00",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputPassword: {
    width: "100%",
  },
  iconEye: {
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    left: -40,
    bottom: 7,
  },
  containerButtonSing: {
    backgroundColor: "#FF6C00",
    height: 50,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
  },
  textButtonSing: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  textButtonOr: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});
export default LoginScreen;
