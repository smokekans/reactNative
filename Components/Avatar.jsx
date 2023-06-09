import React, { useState } from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { getUserAvatar } from "../redux/authSelectors";
import { updateAvatar } from "../redux/authSlice";
import { changeAvatar } from "../redux/authOperations";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";
const ImageAvatarDefault = "../assets/images/defaultUser.jpg";

function Avatar() {
  const dispatch = useDispatch();
  const userAvatar = useSelector(getUserAvatar);
  const [avatar, setAvatar] = useState(userAvatar);

  const avatarAdd = async () => {
    let imageFromGallery = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!imageFromGallery.canceled) {
      setAvatar(imageFromGallery.assets[0].uri);

      const avatarURL = await uploadAvatar(imageFromGallery.assets[0].uri);
      dispatch(changeAvatar(avatarURL));
    }
  };

  const avatarRemove = () => {
    setAvatar(null);
    dispatch(changeAvatar(null));
  };

  const uploadAvatar = async (avatar) => {
    const avatarId = Date.now().toString();
    const path = `userAvatars/${avatarId}.jpeg`;

    const response = await fetch(avatar);
    const file = await response.blob();

    const avatarsRef = ref(storage, path);
    await uploadBytes(avatarsRef, file);

    const avatarURL = await getDownloadURL(ref(storage, avatarsRef));
    return avatarURL;
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={avatar ? { uri: avatar } : require(ImageAvatarDefault)}
      />
      <Pressable
        style={!avatar ? styles.iconAdd : styles.iconRemove}
        onPress={avatar ? avatarRemove : avatarAdd}
      >
        <AntDesign name="pluscircle" size={34} color="#FF6C00" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
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
  iconAdd: { position: "absolute", left: "63%" },
  iconRemove: {
    position: "absolute",
    left: "63%",
    transform: [{ rotate: "45deg" }],
  },
});

export default Avatar;
