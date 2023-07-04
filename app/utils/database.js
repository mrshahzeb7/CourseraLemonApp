import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);",
        );
      },
      reject,
      resolve,
    );
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
export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("select * from menuitems", [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  return new Promise((resolve, reject) => {
    // const values = menuItems
    //   .map(
    //     (item) =>
    //       `(${item.id}, '${item.title}', '${item.price}', '${item.category}')`,
    //   )
    //   .join(",");

    const sql = `insert into menuitems (id, name, price, description, image, category) values ${menuItems
      .map(
        (item) =>
          `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`,
      )
      .join(", ")}`;

    db.transaction(
      (tx) => {
        tx.executeSql(sql);
      },
      reject,
      resolve,
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      `insert into menuitems (id, name, price, description, image, category) values ${menuItems
        .map(
          (item) =>
            `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`,
        )
        .join(", ")}`,
    );
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from menuitems where name like ? and category in ('${activeCategories.join(
          "','",
        )}')`,
        [`%${query}%`],
        (_, { rows }) => {
          resolve(rows._array);
        },
      );
    }, reject);
  });
}

export async function test(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from menuitems`,
        [`%${query}%`],
        (_, { rows }) => {
          console.log(JSON.stringify(rows._array, null, 8));
          resolve(rows._array);
        },
      );
    }, reject);
  });
}
