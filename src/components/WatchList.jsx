import React, { useContext, useEffect, useState } from "react";
import genreData from "../assets/genre.json";
import WatchListCard from "./WatchListCard";
import WatchListDetail from "./WatchListDetail";
import { MyContext } from "./Context/WatchListContext";

function WatchList() {
  const { watchList } = useContext(MyContext);
  const [genres, setGenres] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [activeGenre, setActiveGenre] = useState("All Genre");
  const [view, setView] = useState(()=>{
    return localStorage.getItem("WatchListView") || "Detail";
  });

  useEffect(()=>{
    localStorage.setItem("WatchListView", view)
  },[view])

  useEffect(() => {
    const newGenres = new Set();

    watchList.forEach((mov) => {
      mov.genre_ids.forEach((id) => newGenres.add(id));
    });

    setGenres([...newGenres]);
  }, [watchList]);

  function handelSearch(e) {
    setSearchField(e.target.value);
  }
  return (
    <div>
      {/* Genre Based Filtering */}
      <div className="flex overflow-x-auto whitespace-nowrap space-x-4 p-4 scrollbar-hide justify-center">
        <button
          className={`px-4 py-2 rounded-lg shadow-md ${
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
              className={`px-4 py-2 rounded-lg shadow-md ${
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
      <div className="flex justify-center">
        <input
          type="text"
          className="text-black bg-white w-[500px] m-8 p-2 text-2xl border-2 border-black rounded"
          placeholder="Search"
          value={searchField}
          onChange={handelSearch}
        />
      </div>

      {/* WatchList View */}

      <button
        className="px-4 py-2 rounded-lg shadow-md bg-red-400 absolute top-40 left-10"
        onClick={() =>
          setView((prev) => (prev === "Detail" ? "Card" : "Detail"))
        }
      >
        {view === "Detail" ? "Card view" : "Detailed view"}
      </button>

      {
        view == "Detail" ? <WatchListDetail searchField={searchField} activeGenre={activeGenre}/> : <WatchListCard searchField={searchField} activeGenre={activeGenre}/>
      }
    </div>
  );
}

export default WatchList;
