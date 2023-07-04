import { useEffect, useState } from "react";
import { useUpdateEffect } from "./useUpdateEffect";
import { sections } from "../content";
import { Alert } from "react-native";
import {
  createTable,
  filterByQueryAndCategories,
  getMenuItems,
  saveMenuItems,
} from "../database";
import { getSectionListData } from "../utils";
import { getMenuList } from "../../services";

export function useSectionData(filterSelections, query) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();
        if (!menuItems.length) {
          menuItems = await getMenuList();

          try {
            await saveMenuItems(menuItems);
          } catch (error) {
            alert("oops something went wrong...");
          }
        }

        const sectionListData = getSectionListData(menuItems);

        setData(sectionListData);
      } catch (e) {
        // Handle error
        console.log(e);
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });

      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories,
        );

        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  return { data, setData };
}
