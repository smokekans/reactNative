import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostScreen";
import ProfileScreen from "./ProfileScreen";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authSignOut } from "../../redux/authOperations";

const Nested = createStackNavigator();

function DefaultScreen() {
  const dispatch = useDispatch();
  const signOut = () => dispatch(authSignOut());
  return (
    <Nested.Navigator
      initialRouteName="Posts"
      screenOptions={{
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
      }}
    >
      <Nested.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerTitle: "Публікації",
          headerRight: () => (
            <Pressable style={{ marginRight: 16 }} onPress={signOut}>
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </Pressable>
          ),
        }}
      />
      <Nested.Screen name="CreatePost" component={CreatePostScreen} />
      <Nested.Screen name="Profile" component={ProfileScreen} />
    </Nested.Navigator>
  );
}

export default DefaultScreen;
