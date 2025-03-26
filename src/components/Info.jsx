import React, { useContext, useEffect, useState } from "react";
import genreData from "../assets/genre.json";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import Recomendation from "./Recomendation";
import { MyContext } from "./Context/WatchListContext";

function Info() {
  const {watchList, setWatchList} = useContext(MyContext)
  const location = useLocation();
  const movie = location.state?.movie;
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!movie) return;
    const isMovieLiked = watchList.some((mov) => mov.id === movie.id);
    setIsLiked(isMovieLiked);
  }, [watchList, movie]);

  if (!movie) {
    return (
      <p className="text-white flex justify-center m-9 text-4xl">
        No movie data available 😟
      </p>
    );
  }

  function liked() {
    if (isLiked) {
      // remove from watchList
      const updatedList = watchList.filter((mov) => mov.id !== movie.id);
      setWatchList(updatedList);
      localStorage.setItem("watchList", JSON.stringify(updatedList));
    } else {
      // add to watchList
      const updatedList = [...watchList, movie];
      setWatchList(updatedList);
      localStorage.setItem("watchList", JSON.stringify(updatedList));
    }
    setIsLiked(!isLiked);
  }

  return (
    <div className="text-white max-w-7xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
      {/* Movie Poster + Details */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Movie Poster */}
        <div className="flex-shrink-0">
          {movie.poster_path || movie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original/${
                movie.poster_path || movie.backdrop_path
              }`}
              className="w-64 rounded-lg shadow-md"
              alt="Movie Poster"
            />
          ) : (
            <span className="text-gray-400">No Image Available</span>
          )}
        </div>

        {/* Movie Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-3">
            {movie.title}
            <button
              className="text-red-600 bg-black/50 p-2 rounded-full hover:bg-black/70"
              onClick={liked}
            >
              <FontAwesomeIcon icon={isLiked ? solidHeart : regularHeart} />
            </button>
          </h1>

          <p className="text-gray-400 text-lg">{movie.overview}</p>

          <div className="flex gap-4 mt-4">
            <p className="bg-yellow-600 text-black px-3 py-1 rounded-full text-sm font-bold">
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </p>
            <a
              href={`https://www.youtube.com/results?search_query=${movie.title} trailer`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-blue-800 transition"
            >
              🎬 Watch Trailer
            </a>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-6 border-t border-gray-600 pt-4">
        <p className="text-lg">
          📅 <span className="font-semibold">Release Date:</span>{" "}
          {movie.release_date}
        </p>

        <p className="text-lg">
          🎭 <span className="font-semibold">Genre:</span>{" "}
          {movie.genre_ids.map((id) => genreData[id]).join(", ")}
        </p>

        <p className="text-lg">
          🗣 <span className="font-semibold">Language:</span>{" "}
          {new Intl.DisplayNames(["en"], { type: "language" }).of(
            movie.original_language
          )}
        </p>

        <p className="text-lg">
          🔥 <span className="font-semibold">Popularity:</span>{" "}
          {movie.popularity.toFixed(3)}
        </p>
        
        <p className="text-lg">
          🔞 <span className="font-semibold">Adult:</span>{" "}
          {movie.adult ? "Yes" : "No"}
        </p>
      </div>
      <Recomendation movID = {movie.id}/>
    </div>
  );
}

export default Info;
