import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { AuthContext } from "./Auth";

const supabaseUrl = import.meta.env.VITE_PROJ_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  const [watchListTV, setWatchListTV] = useState([]);
  const { email, authenticated } = useContext(AuthContext);

  useEffect(() => {
    let watch = localStorage.getItem("watchList");
    let watchTV = localStorage.getItem("watchListTV");

    if (!watch) {
      localStorage.setItem("watchList", JSON.stringify([]));
    } else {
      setWatchList(JSON.parse(watch));
    }
    if (!watchTV) {
      localStorage.setItem("watchListTV", JSON.stringify([]));
    } else {
      setWatchListTV(JSON.parse(watchTV));
    }
  }, []);

  async function updateWatchList() {
    console.log(authenticated, email)
    if(!authenticated) return
    const { error } = await supabase
      .from("movie-hub-authentication")
      .update({ watchList: JSON.stringify(watchList) })
      .eq("email", email);

    if (error) {
      console.error(error);
      alert("There was some error adding you. Please try again.");
    } else {
      console.log("watchList updated succesfully")
    }
  }

  useEffect(() => {
    updateWatchList();
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  return (
    <MyContext.Provider
      value={{ watchList, setWatchList, watchListTV, setWatchListTV }}
    >
      {children}
    </MyContext.Provider>
  );
};
