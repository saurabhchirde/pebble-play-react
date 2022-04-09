import { createContext, useContext, useReducer, useState } from "react";
import { filterReducer } from "./filterReducer";

const filterInitialState = {
  sort: "",
  bySearch: "",
};

const filterContext = createContext(filterInitialState);

const FilterProvider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    filterInitialState
  );
  const [searchInput, setSearchInput] = useState("");

  return (
    <filterContext.Provider
      value={{ filterState, filterDispatch, searchInput, setSearchInput }}
    >
      {children}
    </filterContext.Provider>
  );
};

const useFilter = () => useContext(filterContext);

export { FilterProvider, useFilter };
