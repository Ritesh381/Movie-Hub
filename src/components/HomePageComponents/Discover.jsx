import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../assets/key";
import Pagination from "../commonComponents/Pagination";
import MovieCard from "../commonComponents/MovieCard";
import { MiniLoader } from "../commonComponents/CircularLoader";

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

  const [selectedSorting, setSelectedSorting] = useState(()=>{
    return localStorage.getItem("selectedSortingDiscover") || "vote_count.desc";
  });
  const [adult, setAdult] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(() => {
    return Number(localStorage.getItem("pageNoDiscover")) || 1;
  });

  useEffect(() => {
    setAdult(false);
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=${adult}&language=en-US&page=${pageNo}&sort_by=${selectedSorting}`
      )
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error: " + error);
        setLoading(false);
      });
    localStorage.setItem("pageNoDiscover", pageNo);
    localStorage.setItem("selectedSortingDiscover", selectedSorting)
  }, [pageNo, selectedSorting, adult]);
  return (
    <div className="container mx-auto px-4 py-8 bg-ultra-black min-h-screen page-transition">
      <h1 className="text-2xl md:text-3xl font-medium text-white text-center mb-8">
        🔍 Discover
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

        <div className="flex items-center space-x-6">
          <label htmlFor="sorting" className="text-sm text-neon-purple font-medium">
            Sort by:
          </label>
          <select
            id="sorting"
            value={selectedSorting}
            onChange={(e) => setSelectedSorting(e.target.value)}
            className="modern-input px-4 py-2 text-sm rounded-full"
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
        <div className="flex justify-center items-center h-64">
          <MiniLoader size={80} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movieObj={movie} />
          ))}
        </div>
      )}

      <Pagination
        pageNo={pageNo}
        setPageNo={setPageNo}
      />
    </div>
  );
}

export default Discover;
