import axios from "axios";
import React, { useEffect, useState } from "react";
const API_KEY = "6afe036d391f25fd70b37bbb83def578";
import MovieCard from "./MovieCard";

function Recomendation({ movID }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movID}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
        console.log(response.data.results);
      })
      .catch((error) => console.log("Error: " + error));
  }, [movID]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-orange-300 my-5">
        Recommendations
      </h1>

      <div className="grid grid-cols-4 gap-6">
        {loading ? (
          <div className="text-white text-lg">Loading...</div>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} movieObj={movie} />)
        )}
      </div>
    </div>
  );
}

export default Recomendation;
