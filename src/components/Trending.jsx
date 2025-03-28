import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../assets/key";
import HorizontalView from "./HorizontalView";

function Trending() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => console.log("Error: " + error));
  }, []);

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-300 my-4 sm:my-5 self-start">
        Trending these days
      </h1>

      <HorizontalView movies={movies} showMorePage={"trending"}/>
    </div>
  );
}

export default Trending;
