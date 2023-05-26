import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import ImageUser from "../assets/images/user.jpg";

function PostsScreen() {
  const DATA = [
    {
      title: "Posts",
      data: [
        {
          image: `${require("../assets/images/forest.jpg")}`,
          title: "Ліс",
          comments: "8",
          likes: "153",
          location: "Ukraine",
        },
        {
          image: `${require("../assets/images/sunset.jpg")}`,
          title: "Захід на Чорному морі",
          comments: "3",
          likes: "200",
          location: "Ukraine",
        },
        {
          image: `${require("../assets/images/oldHouse.jpg")}`,
          title: "Старий будиночок у Венеції",
          comments: "50",
          likes: "287",
          location: "Italy",
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.boxImage}>
        <Image style={styles.imageUser} source={ImageUser} alt="user" />
        <View style={styles.boxInfo}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <View>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View>
              <Image
                style={styles.imageMap}
                source={item.image}
                alt={item.title}
              />
              <Text style={styles.titleMap}>{item.title}</Text>
              <View style={styles.containerInfoMap}>
                <View style={styles.boxCommentsMap}>
                  <EvilIcons name="comment" size={24} color="#FF6C00" />
                  <Text style={styles.textMap}>{item.comments}</Text>
                </View>
                <View style={styles.boxLikesMap}>
                  <EvilIcons name="like" size={24} color="#FF6C00" />
                  <Text style={styles.textMap}>{item.likes}</Text>
                </View>
                <View style={styles.boxLocationMap}>
                  <EvilIcons name="location" size={24} color="#BDBDBD" />
                  <Text style={styles.textLocationMap}>{item.location}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: "#FFFFFF" },
  boxImage: {
    paddingVertical: 32,
    flexDirection: "row",
  },
  imageUser: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 6,
    alignItems: "center",
  },

  boxInfo: {
    display: "flex",
    justifyContent: "center",
  },
  name: {
    fontFamily: "Roboto-Bold",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  imageMap: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  titleMap: {
    fontFamily: "Roboto-Medium",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    paddingVertical: 8,
  },
  containerInfoMap: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 32,
  },
  boxCommentsMap: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 6,
  },
  boxLikesMap: { flexDirection: "row", alignItems: "center" },
  boxLocationMap: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  textMap: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  textLocationMap: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    textDecorationLine: "underline",
    color: "#212121",
  },
});

export default PostsScreen;
