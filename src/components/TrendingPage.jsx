import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";
import { API_KEY } from "../assets/key";


function TrendingPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(() => {
    return Number(localStorage.getItem("pageNo")) || 1;
  });
  const [totalPages, setTotalPages] = useState(1000)

  const pageNext = () => setPageNo(pageNo + 1);
  const pagePrev = () => pageNo > 1 && setPageNo(pageNo - 1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNo}`
      )
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
        setTotalPages(response.data.total_pages)
        console.log(response.data.results);
      })
      .catch((error) => console.log("Error: " + error));
      localStorage.setItem("pageNo", pageNo)
  }, [pageNo]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-orange-300 my-5">
        Trending Movies
      </h1>

      <div className="grid grid-cols-5 gap-6">
        {loading ? (
          <div className="text-white text-lg">Loading...</div>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieObj={movie}
            />
          ))
        )}
      </div>

      <Pagination
        pageNext={pageNext}
        pagePrev={pagePrev}
        pageNo={pageNo}
        setPageNo={setPageNo}
        totalPages={totalPages}
      />
    </div>
  );
}

export default TrendingPage;
