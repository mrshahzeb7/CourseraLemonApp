import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const MenuItem = ({ item: { title, price } }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>${price}</Text>
  </View>
);

export const renderSectionHeader = ({ section: { title } }) => (
  <Text style={styles.header}>{title}</Text>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  title: {
    fontSize: 20,
    color: "white",
  },
  header: {
    fontSize: 24,
    paddingVertical: 8,
    color: "#FBDABB",
    backgroundColor: "#495E57",
  },
});
