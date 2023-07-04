import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Images } from "../assets";

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Images.Logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: "90%",
    resizeMode: "contain",
  },
});
