import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_KEY } from "../assets/key";
import axios from "axios";
import VerticalView from "./VerticalView";
import Pagination from "./Pagination";

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(500);

  const handelSearch = () => {
    if (searchQuery.trim()) {
      console.log(searchQuery.trim());
      let query = searchQuery.trim().replace(/\s+/g, "+");
      navigate(`/search?q=${query}`);
    }
  };

  const handelKeyDown = (e) => {
    if (e.key === "Enter") {
      handelSearch();
    }
  };

  useEffect(() => {
    let que = new URLSearchParams(location.search).get("q");
    setSearchQuery(que);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${que}&include_adult=false&language=en-US&page=${pageNo}'`
      )
      .then((response) => {
        console.log(response.data.results);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      });
  }, [location.search, pageNo]);

  return (
    <div className="flex flex-col justify-center items-center text-black">
      <div className="flex m-6">
        <input
          value={searchQuery}
          onKeyDown={handelKeyDown}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search for Movies"
          className="bg-white w-full text-base md:text-xl p-2 md:p-3 rounded-l-2xl border-blue-300"
        />
        <button
          className="bg-gray-200 w-16 md:w-20 rounded-r-2xl text-base md:text-xl"
          onClick={handelSearch}
        >
          🔍
        </button>
      </div>
      {movies.length == 0 ? (
        <p className="text-4xl text-white self-start ml-5">
          No results found for: {searchQuery}
        </p>
      ) : (
        <div className="m-6">
          <VerticalView movies={movies} />
          <Pagination
            pageNo={pageNo}
            setPageNo={setPageNo}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
