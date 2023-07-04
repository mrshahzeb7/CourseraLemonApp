import React, { forwardRef, useImperativeHandle, useState } from "react";
import { SectionList, StyleSheet } from "react-native";

import { sections } from "../utils/content";
import { useSectionData } from "../utils/customHooks";
import { keyExtractor } from "../utils/utils";
import { MenuItem, renderSectionHeader } from "./MenuListComponents";

export const MenuList = forwardRef(function MenuList(_, ref) {
  const [query, setQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false),
  );

  const { data } = useSectionData(filterSelections, query);

  useImperativeHandle(ref, () => ({
    setFilterSelections,
    setQuery,
  }));

  return (
    <SectionList
      style={styles.sectionList}
      sections={data}
      keyExtractor={keyExtractor}
      renderItem={MenuItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
});

const styles = StyleSheet.create({
  sectionList: {
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 24,
    paddingVertical: 8,
    color: "#FBDABB",
    backgroundColor: "#495E57",
  },
});
