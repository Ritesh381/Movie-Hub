import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../assets/key";
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";

function Discover() {
  const sortingOptions = [
    "original_title.asc",
    "original_title.desc",
    "popularity.asc",
    "popularity.desc",
    "revenue.asc",
    "revenue.desc",
    "primary_release_date.asc",
    "primary_release_date.desc",
    "title.asc",
    "title.desc",
    "vote_average.asc",
    "vote_average.desc",
    "vote_count.asc",
    "vote_count.desc",
  ];

  const [selectedSorting, setSelectedSorting] = useState("vote_count.desc");
  const [adult, setAdult] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(() => {
    return Number(localStorage.getItem("pageNoDiscover")) || 1;
  });

  const pageNext = () => pageNo<500 && setPageNo(pageNo + 1);
  const pagePrev = () => pageNo > 1 && setPageNo(pageNo - 1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=${adult}&language=en-US&page=${pageNo}&sort_by=${selectedSorting}`
      )
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
        console.log(response.data.results);
      })
      .catch((error) => console.log("Error: " + error));
    localStorage.setItem("pageNoDiscover", pageNo);
  }, [pageNo, selectedSorting, adult]);
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl text-orange-300 md:text-3xl font-bold mb-6 text-center">
        Discover Movies
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          {/* <button 
            onClick={() => setAdult(!adult)} 
            className={`
              ${adult ? "bg-red-500" : "bg-green-500"} 
              text-white px-3 py-2 rounded transition-colors duration-300
            `}
          >
            {adult ? "Adult Content On" : "Adult Content Off"}
          </button> */}
        </div>

        <div className="flex items-center space-x-4 text-black">
          <label htmlFor="sorting" className="text-sm text-white font-medium">
            Sort by:
          </label>
          <select
            id="sorting"
            value={selectedSorting}
            onChange={(e) => setSelectedSorting(e.target.value)}
            className="border bg-blue-400 rounded px-2 py-2 text-sm"
          >
            {sortingOptions.map((option) => (
              <option key={option} value={option}>
                {option
                  .replace(".", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movieObj={movie} />
          ))}
        </div>
      )}

      <Pagination
        pageNext={pageNext}
        pagePrev={pagePrev}
        pageNo={pageNo}
        setPageNo={setPageNo}
      />
    </div>
  );
}

export default Discover;
