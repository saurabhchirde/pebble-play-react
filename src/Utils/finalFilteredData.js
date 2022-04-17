import { filterByCategory } from "./filterByCategory";
import { filterByLatest } from "./filterByLatest";
import { searchVideo } from "./searchVideo";

export const finalFilteredData = (originalData, filterState) => {
  let filteredArray = [...originalData];

  filteredArray = filterByCategory(filteredArray, filterState.byCategory);
  filteredArray = searchVideo(filteredArray, filterState.bySearch);
  filteredArray = filterByLatest(filteredArray, filterState.byLatest);

  return filteredArray;
};
