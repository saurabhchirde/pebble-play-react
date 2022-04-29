import { useEffect } from "react";

const useLocalStorageSet = (key, value) =>
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

const useLocalStorageGet = (key) => JSON.parse(localStorage.getItem(key));

export { useLocalStorageGet, useLocalStorageSet };
