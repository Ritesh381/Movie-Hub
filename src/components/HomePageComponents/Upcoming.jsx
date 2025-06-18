import React, { useEffect, useState } from "react";
import HorizontalView from "../commonComponents/HorizontalView";
import axios from "axios";
import { API_KEY } from "../../assets/key";
import { MiniLoader } from "../commonComponents/CircularLoader";

function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=2`
      )
      .then((response) => {
        setMovies(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error: " + error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8">
      <h1 className="text-xl md:text-2xl font-medium text-white self-start mb-6">
        🎬 Upcoming
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-80">
          <MiniLoader size={60} />
        </div>
      ) : (
        <HorizontalView movies={movies} showMorePage={"upcoming"}/>
      )}
    </div>
  );
}

export default Upcoming;
