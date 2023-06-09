import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../Screens/authScreens/RegistrationScreen";
import LoginScreen from "../Screens/authScreens/LoginScreen";
import ProfileScreen from "../Screens/homeScreens/ProfileScreen";
import { AntDesign } from "@expo/vector-icons";
import DefaultScreen from "../Screens/homeScreens/DefaultScreen";
import { Pressable, Platform } from "react-native";
import CreatePostScreen from "../Screens/homeScreens/CreatePostScreen";

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const useRouter = (isAuthorized) => {
  const navigation = useNavigation();

  if (!isAuthorized) {
    return (
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
      </AuthStack.Navigator>
    );
  }
  return (
    <Tabs.Navigator
      initialRouteName="DefaultScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "DefaultScreen") {
            iconName = "appstore-o";
          } else if (route.name === "CreatePost") {
            iconName = "plus";
          } else if (route.name === "Profile") {
            iconName = "user";
          }
          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarItemStyle: {
          ...Platform.select({
            ios: {
              borderRadius: 20,
              marginHorizontal: 11,
            },
            android: {
              borderRadius: 20,
              marginHorizontal: 11,
              marginVertical: 11,
            },
          }),
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#21212180",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarInactiveBackgroundColor: "#ffffff",
        tabBarStyle: [
          {
            ...Platform.select({
              ios: {
                height: 83,
                paddingVertical: 9,
                paddingHorizontal: 20,
                borderTopWidth: 1,
                display: route.name === "CreatePost" ? "none" : "flex",
              },
              android: {
                height: 63,
                paddingHorizontal: 20,
                borderTopWidth: 1,
                display: route.name === "CreatePost" ? "none" : "flex",
              },
            }),
          },
        ],
        tabBarShowLabel: false,
        headerTitleStyle: {
          fontFamily: "Roboto-500",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: 17,
          lineHeight: 22,
          textAlign: "center",
          letterSpacing: -0.408,
          color: "#212121",
        },
        headerTitleAlign: "center",
        headerStyle: {
          borderBottomWidth: 1,
        },
      })}
    >
      <Tabs.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          headerTitle: "Створити публікацію",
          headerLeft: () => (
            <Pressable
              style={{ marginHorizontal: 16 }}
              onPress={() => navigation.navigate("DefaultScreen")}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

export default useRouter;
