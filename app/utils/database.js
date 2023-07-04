import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text);",
        );
      },
      reject,
      resolve,
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("select * from menuitems", [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function clearDatabase() {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM menuitems",
      [],
      (_, result) => {
        // Handle success
      },
      (_, error) => {
        // Handle error
      },
    );
  });
}
export async function saveMenuItems(menuItems) {
  return new Promise((resolve, reject) => {
    const values = menuItems
      .map(
        (item) =>
          `(${item.id}, '${item.title}', '${item.price}', '${item.category}')`,
      )
      .join(",");

    const sql = `INSERT INTO menuitems (uuid, title, price, category) VALUES ${values}`;

    db.transaction(
      (tx) => {
        tx.executeSql(sql);
      },
      reject,
      resolve,
    );
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const categoryCondition =
        activeCategories.length > 0
          ? `category IN (${activeCategories.map(() => "?").join(",")})`
          : "1";

      const sql = `
        SELECT *
        FROM menuitems
        WHERE title LIKE '%' || ? || '%'
          AND ${categoryCondition}
      `;
      const params = [query, ...activeCategories];
      tx.executeSql(
        sql,
        params,
        (_, result) => {
          const filteredMenuItems = [];
          for (let i = 0; i < result.rows.length; i++) {
            filteredMenuItems.push(result.rows.item(i));
          }
          resolve(filteredMenuItems);
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
}
