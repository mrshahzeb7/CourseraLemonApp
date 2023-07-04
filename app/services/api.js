import { endPoints } from "./endpoints";

const getMenuList = async () => {
  let list = [];
  try {
    let response = await fetch(endPoints.getMenu);
    response = await response.json();

    if (response.menu) {
      list = response.menu;
    }
  } catch (error) {
    list = [];
  }

  list.length &&
    list.map((item) => {
      item.category = item.category.title;
    });

  return list;
};

export { getMenuList };
