import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  const [watchListTV, setWatchListTV] = useState([]);

  useEffect(() => {
    let watch = localStorage.getItem("watchList");
    let watchTV = localStorage.getItem("watchListTV")

    if (!watch) {
      localStorage.setItem("watchList", JSON.stringify([]));
    } else {
      setWatchList(JSON.parse(watch));
    }
    if(!watchTV){
      localStorage.setItem("watchListTV", JSON.stringify([]));
    }else{
      setWatchListTV(JSON.parse(watchTV))
    }
  }, []);

  return (
    <MyContext.Provider value={{ watchList, setWatchList, watchListTV, setWatchListTV }}>
      {children}
    </MyContext.Provider>
  );
};
