import React from "react";
import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import BackgroundImage from "../../Components/BackgroundImage";
import PostsScreen from "./PostsScreen";
import Avatar from "../../Components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail, getUserName } from "../../redux/authSelectors";
import { MaterialIcons } from "@expo/vector-icons";
import { authSignOut } from "../../redux/authOperations";

function ProfileScreen() {
  const dispatch = useDispatch();
  const userName = useSelector(getUserName);
  const userEmail = useSelector(getUserEmail);

  const signOut = () => {
    dispatch(authSignOut());
  };

  return (
    <View style={styles.container}>
      <BackgroundImage>
        <View
          style={{
            ...styles.containerProfile,
            width: Dimensions.get("window").width,
          }}
        >
          <Avatar />
          <View style={{ alignItems: "flex-end", top: -120 }}>
            <Pressable onPress={signOut}>
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </Pressable>
          </View>
          <Text style={styles.title}>{userEmail}</Text>
          {/* <PostsScreen /> */}
        </View>
      </BackgroundImage>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  containerProfile: {
    flex: 0.8,
    backgroundColor: "white",
    marginTop: "auto",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    padding: 16,
  },
  imageContainer: {
    flexDirection: "row",
  },
  image: {
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
  title: {
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
});

export default ProfileScreen;
