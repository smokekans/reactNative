import React from "react";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import { Pressable } from "react-native";
import PostsScreen from "./Screens/PostsScreen";
// import { useNavigation } from "@react-navigation/native";

const AuthStack = createNativeStackNavigator();
// const HomeStack = createNativeStackNavigator();

export default function App() {
  // const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Posts"
          component={PostsScreen}
          options={{
            title: "Публікації",
            headerRight: () => (
              <Pressable
                // onPress={() => navigation("Login")}
                style={{ marginRight: 10 }}
              >
                <MaterialIcons name="logout" size={24} color="#BDBDBD" />
              </Pressable>
            ),
          }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
