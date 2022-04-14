export const filterByLatest = (filteredArray, byLatest) => {
  const withouFiltered = [...filteredArray];
  if (byLatest === "") {
    return withouFiltered;
  } else {
    withouFiltered.sort((a, b) => {
      let date1 = a.snippet.publishedAt.slice(0, 10).split("-").join("");
      let date2 = b.snippet.publishedAt.slice(0, 10).split("-").join("");
      return date2 - date1;
    });
  }
  return withouFiltered;
};
