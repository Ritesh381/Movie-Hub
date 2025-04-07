import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../commonComponents/Pagination";
import VerticalView from "../commonComponents/VerticalView";
import { API_KEY } from "../../assets/key";


function TrendingPage() {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(() => {
    return Number(localStorage.getItem("pageNo")) || 1;
  });
  const [totalPages, setTotalPages] = useState(1000)

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNo}`
      )
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages)
      })
      .catch((error) => console.log("Error: " + error));
      localStorage.setItem("pageNo", pageNo)
  }, [pageNo]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-orange-300 my-5">
        Trending Movies
      </h1>

      <VerticalView movies={movies}/>

      <Pagination
        pageNo={pageNo}
        setPageNo={setPageNo}
        totalPages={totalPages}
      />
    </div>
  );
}

export default TrendingPage;
