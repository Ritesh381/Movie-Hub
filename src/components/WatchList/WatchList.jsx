import React, { useContext, useEffect, useState } from "react";
import genreData from "../../assets/genre.json";
import WatchListCard from "./WatchListCard";
import WatchListDetail from "./WatchListDetail";
import { MyContext } from "../Context/WatchListContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Auth";

function WatchList() {
  const { watchList, setWatchList } = useContext(MyContext);
  const [genres, setGenres] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [activeGenre, setActiveGenre] = useState("All Genre");
  const [view, setView] = useState(() => {
    return localStorage.getItem("WatchListView") || "Detail";
  });
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    localStorage.setItem("WatchListView", view);
  }, [view]);
  console.log(authenticated);
  useEffect(() => {
    const newGenres = new Set();

    watchList.forEach((mov) => {
      if (mov.genre_ids) {
        mov.genre_ids.forEach((id) => newGenres.add(id));
      }
    });

    setGenres([...newGenres]);
  }, [watchList]);

  function handelSearch(e) {
    setSearchField(e.target.value);
  }

  return (
    <div className="px-2 sm:px-4 md:px-6">
      {/* Genre Based Filtering */}
      <div className="flex overflow-x-auto whitespace-nowrap space-x-2 sm:space-x-3 md:space-x-4 p-2 sm:p-3 md:p-4 scrollbar-hide justify-start sm:justify-center">
        <button
          className={`px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-lg shadow-md text-xs sm:text-sm md:text-base ${
            activeGenre === "All Genre"
              ? "bg-blue-800"
              : "bg-blue-400 hover:bg-red-700"
          }`}
          onClick={() => setActiveGenre("All Genre")}
        >
          All Genre
        </button>
        {genres.map((key) => {
          return (
            <button
              key={key}
              className={`px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-lg shadow-md text-xs sm:text-sm md:text-base ${
                activeGenre === genreData[key]
                  ? "bg-blue-800"
                  : "bg-blue-400 hover:bg-red-700"
              }`}
              onClick={() => setActiveGenre(genreData[key])}
            >
              {genreData[key]}
            </button>
          );
        })}
      </div>

      {/* Search Field */}
      <div className="flex justify-center my-3 sm:my-5 md:my-8">
        <input
          type="text"
          className="text-black bg-white w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] p-2 text-base sm:text-xl md:text-2xl border-2 border-black rounded"
          placeholder="Search"
          value={searchField}
          onChange={handelSearch}
        />
      </div>

      {/* View Toggle Button */}
      <div className="flex justify-between mb-2 sm:mb-3 md:mb-4">
        {authenticated == false ? (
          <p className="text-white text-left">
            Save your watchList by{" "}
            <Link to={"/login"} className="text-red-400">
              Signup/Login
            </Link>
          </p>
        ) : (
          <p
            className="text-red-400 cursor-pointer"
            onClick={() => {
              setAuthenticated(false);
              setWatchList([]);
            }}
          >
            Logout
          </p>
        )}
        <button
          className="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-lg shadow-md bg-red-400 text-xs sm:text-sm md:text-base"
          onClick={() =>
            setView((prev) => (prev === "Detail" ? "Card" : "Detail"))
          }
        >
          {view === "Detail" ? "Card view" : "Detailed view"}
        </button>
      </div>

      {/* Content View */}
      {view == "Detail" ? (
        <WatchListDetail searchField={searchField} activeGenre={activeGenre} />
      ) : (
        <WatchListCard searchField={searchField} activeGenre={activeGenre} />
      )}
    </div>
  );
}

export default WatchList;
