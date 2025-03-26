/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

// Creating Context
export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    let watch = localStorage.getItem("watchList");

    if (!watch) {
      localStorage.setItem("watchList", JSON.stringify([]));
    } else {
      setWatchList(JSON.parse(watch));
    }
  }, []);

  return (
    <MyContext.Provider value={{ watchList, setWatchList }}>
      {children}
    </MyContext.Provider>
  );
};
