import { useRef } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Filters, MenuList, SearchBar } from "../components";

export const Menu = () => {
  const menuListRef = useRef();

  const handleFiltersChange = async (filter) => {
    menuListRef?.current?.setFilterSelections?.(filter);
  };

  const onSearch = (text) => {
    menuListRef?.current?.setQuery?.(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onChangeText={onSearch} />
      <Filters onChange={handleFiltersChange} />
      <MenuList ref={menuListRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#495E57",
  },
});
