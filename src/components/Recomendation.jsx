import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../assets/key";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

function Recomendation({ movID }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movID}/recommendations?api_key=${API_KEY}&language=en-US&page=${pageNo}`
      )
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
        setTotalPages(response.data.total_pages);
        console.log(response);
      })
      .catch((error) => console.log("Error: " + error));
  }, [movID, pageNo]);

  if (movies.length == 0) return <></>;
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-orange-300 my-5">
        More like this
      </h1>

      <div className="grid grid-cols-5 gap-6">
        {loading ? (
          <div className="text-white text-lg">Loading...</div>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} movieObj={movie} />)
        )}
      </div>
      <Pagination
        pageNo={pageNo}
        setPageNo={setPageNo}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Recomendation;
