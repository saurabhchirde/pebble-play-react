export const filterByCategory = (filteredArray, category) => {
  const withoutFiltered = [...filteredArray];
  if (category === "all") {
    return withoutFiltered;
  } else {
    return withoutFiltered.filter((video) => video.category === category);
  }
};
