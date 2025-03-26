import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { MyContext } from "./Context/WatchListContext";

function MovieCard({ movieObj }) {
  const { watchList, setWatchList } = useContext(MyContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    watchList.forEach((mov) => {
      if (movieObj.id == mov.id) {
        setIsLiked(true);
        return;
      }
    }, []);
  });

  function liked() {
    if (isLiked) {
      // remove from watchList
      const updatedList = watchList.filter((movie) => movie.id !== movieObj.id);
      setWatchList(updatedList);
      localStorage.setItem("watchList", JSON.stringify(updatedList));
    } else {
      // add to watchList
      const updatedList = [...watchList, movieObj];
      setWatchList(updatedList);
      localStorage.setItem("watchList", JSON.stringify(updatedList));
    }
    setIsLiked(!isLiked);
  }

  return (
    <div className="relative w-[250px] h-[350px] rounded-lg overflow-hidden shadow-lg hover:scale-105 duration-300 m-5">
      {movieObj.poster_path || movieObj.backdrop_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${
            movieObj.poster_path || movieObj.backdrop_path
          }`}
          className="w-full h-full object-cover"
          alt="Movie Poster"
        />
      ) : (
        <span className="text-amber-400 absolute inset-0 flex items-center justify-center">
          No Image Found
        </span>
      )}

      <div className="absolute bottom-0 w-full bg-black/70 text-white text-center text-lg p-2">
        {movieObj.title}
      </div>

      <div className="absolute top-2 right-2 flex gap-2">
        <p className="text-white bg-black/50 p-2 rounded-full hover:bg-black/70">
          ⭐ {movieObj.vote_average ? movieObj.vote_average.toFixed(1) : "N/A"}
        </p>

        <Link to="/info" state={{ movie: movieObj }}>
          <button className="text-white bg-black/50 p-2 rounded-full hover:bg-black/70">
            <FontAwesomeIcon icon={faCircleInfo} />
          </button>
        </Link>

        <button
          className="text-red-600 bg-black/50 p-2 rounded-full hover:bg-black/70"
          onClick={liked}
        >
          <FontAwesomeIcon icon={isLiked ? solidHeart : regularHeart} />
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
