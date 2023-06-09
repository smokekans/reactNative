import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useTogglePasswordVisibility } from "../../hooks/useTogglePasswordVisibility";
import { useNavigation } from "@react-navigation/native";
import BackgroundImage from "../../Components/BackgroundImage";
import Avatar from "../../Components/Avatar";
import { authSignUp } from "../../redux/authOperations";
import { getUserAvatar } from "../../redux/authSelectors";

const initialState = {
  username: "Dmutor",
  email: "smoke@gmail.com",
  password: "89908990",
};

function RegistrationScreen() {
  const navigation = useNavigation();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [focusedInput, setFocusedInput] = useState(null);
  const dispatch = useDispatch();
  const isInputFocused = (inputName) => focusedInput === inputName;
  const avatar = useSelector(getUserAvatar);

  const handleInputFocus = (inputName) => {
    setIsShowKeyboard(true);
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setIsShowKeyboard(false);
    setFocusedInput(null);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    // Keyboard.dismiss();
    dispatch(authSignUp(state));
    setState(initialState);
  };

  return (
    <View style={styles.container}>
      <BackgroundImage>
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              height: "100%",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                ...styles.containerForm,
                paddingBottom: isShowKeyboard ? 16 : 111,
                width: Dimensions.get("window").width,
              }}
            >
              <Avatar />
              <Text style={styles.titleForm}>Реєстрація</Text>
              <View>
                <TextInput
                  style={[
                    styles.inputForm,
                    isInputFocused("username") && styles.inputFocused,
                  ]}
                  placeholder="Логін"
                  placeholderTextColor="#BDBDBD"
                  autoComplete="username"
                  cursorColor="#BDBDBD"
                  selectionColor="#555555"
                  textContentType="username"
                  value={state.username}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, username: value }))
                  }
                  onFocus={() => {
                    handleInputFocus("username");
                    setIsShowKeyboard(true);
                  }}
                  onBlur={handleInputBlur}
                />
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
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
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
                  style={styles.containerButtonSign}
                  onPress={onSubmit}
                >
                  <Text style={styles.textButtonSign}>Зареєструватися</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.textButtonOr}>Вже є акаунт? Увійти</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </BackgroundImage>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
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
    left: "63%",
  },
  titleForm: {
    fontFamily: "Roboto-500",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: -42,
    marginBottom: 32,
  },
  inputForm: {
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "Roboto-400",
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
  buttonFocused: {
    backgroundColor: "#000000",
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
  containerButtonSign: {
    backgroundColor: "#FF6C00",
    height: 50,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
  },
  textButtonSign: {
    color: "#FFFFFF",
    fontFamily: "Roboto-400",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  textButtonOr: {
    color: "#1B4371",
    fontFamily: "Roboto-400",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
});

export default RegistrationScreen;
