import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../commonComponents/Pagination";
import VerticalView from "../commonComponents/VerticalView";
import { API_KEY } from "../../assets/key";
import { FullScreenLoader } from "../commonComponents/CircularLoader";
import { useLoadingProgress } from "../../hooks/useLoadingProgress";


function TrendingPage() {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(() => {
    return Number(localStorage.getItem("pageNo")) || 1;
  });
  const [totalPages, setTotalPages] = useState(1000);
  const [isLoading, setIsLoading] = useState(true);
  const progress = useLoadingProgress(isLoading);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNo}`
      )
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error: " + error);
        setIsLoading(false);
      });
      localStorage.setItem("pageNo", pageNo)
  }, [pageNo]);

  return (
    <div className="flex flex-col items-center bg-ultra-black min-h-screen py-12 page-transition">
      {isLoading && (
        <FullScreenLoader 
          progress={progress} 
          text="Loading Trending Movies..."
          subText="Discovering what's hot right now"
        />
      )}
      
      <h1 className="text-2xl md:text-3xl font-medium text-white mb-8">
        🔥 Trending Movies
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
