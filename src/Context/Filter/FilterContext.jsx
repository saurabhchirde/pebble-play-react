import { createContext, useContext, useReducer, useState } from "react";
import { filterReducer } from "./filterReducer";

const filterInitialState = {
  byCategory: "all",
  bySearch: "",
  byLatest: "",
};

const FilterContext = createContext(filterInitialState);

const FilterProvider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    filterInitialState
  );
  const [searchInput, setSearchInput] = useState("");

  return (
    <FilterContext.Provider
      value={{ filterState, filterDispatch, searchInput, setSearchInput }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };
