import { formatDate } from "./formatDate";

export const filterByLatest = (filteredArray, byLatest) => {
  const withouFiltered = [...filteredArray];
  if (byLatest !== "") {
    withouFiltered.sort((a, b) => {
      let date1 = formatDate(a.snippet.publishedAt);
      let date2 = formatDate(b.snippet.publishedAt);
      return date2 - date1;
    });
  }

  return withouFiltered;
};
