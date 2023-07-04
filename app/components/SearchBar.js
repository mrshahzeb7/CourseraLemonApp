import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "../utils/customHooks";
export const SearchBar = ({ onChangeText }) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 250);
  const firstTime = useRef(true);

  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
    } else {
      onChangeText(value);
    }
  }, [debouncedValue]);
  return (
    <Searchbar
      placeholder="Search"
      placeholderTextColor="white"
      onChangeText={setValue}
      value={value}
      style={styles.searchBar}
      iconColor="white"
      inputStyle={styles.input}
      elevation={0}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 24,
    backgroundColor: "#495E57",
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  input: { color: "white" },
});
