import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { sections } from "../utils/content";

export const Filters = ({ onChange }) => {
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false),
  );

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);

    onChange(arrayCopy);
  };

  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            handleFiltersChange(index);
          }}
          style={[
            styles.item,
            {
              flex: 1 / filterSelections.length,
              backgroundColor: filterSelections[index] ? "#EE9972" : "#495E57",
            },
          ]}
        >
          <Text style={{ color: filterSelections[index] ? "black" : "white" }}>
            {section}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: "green",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "white",
  },
});
