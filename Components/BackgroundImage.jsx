import React from "react";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import ImageBG from "../assets/images/background.jpg";

function BackgroundImage({ children }) {
  return (
    <ImageBackground style={styles.backgroundImage} source={ImageBG}>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default BackgroundImage;
