export function getSectionListData(data) {
  const response = data.reduce((accumulator, item) => {
    const categoryName = item.category;

    const existingCategory = accumulator.find(
      (category) => category.title === categoryName,
    );

    if (existingCategory) {
      const { category, ...rest } = item;
      existingCategory.data.push(rest);
    } else {
      const { category, ...rest } = item;
      const newCategory = {
        title: categoryName,
        data: [rest],
      };
      accumulator.push(newCategory);
    }

    return accumulator;
  }, []);

  return response;
}

export const keyExtractor = (item) => item.id;
