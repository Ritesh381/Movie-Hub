import { createContext, useEffect, useState } from "react";

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
