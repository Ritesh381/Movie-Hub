import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../Context/WatchListContext";
import { Info, Heart } from "lucide-react";

function MovieCard({ movieObj, height = 60, width = 40 }) {
  const { watchList, setWatchList } = useContext(MyContext);
  const [isLiked, setIsLiked] = useState(false);

  const title = movieObj?.title || movieObj?.name || "Untitled";

  useEffect(() => {
    const liked = watchList.some((mov) => movieObj.id === mov.id);
    setIsLiked(liked);
  }, [watchList, movieObj.id]);

  function liked() {
    const updatedList = isLiked
      ? watchList.filter((movie) => movie.id !== movieObj.id)
      : [...watchList, movieObj];

    setWatchList(updatedList);
    setIsLiked(!isLiked);
  }

  return (
    <div
      className={`relative flex-shrink-0 w-${width} sm:w-48 md:w-56 h-${height} sm:h-72 md:h-80 
      rounded-2xl overflow-hidden modern-card
      hover:scale-105 duration-300 group`}
    >
      {movieObj.poster_path || movieObj.backdrop_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${
            movieObj.poster_path || movieObj.backdrop_path
          }`}
          className="w-full h-full object-cover"
          alt={`Poster for ${title}`}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <span className="text-amber-400 text-sm text-center">
            No Image Available
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex flex-col justify-end">
        <Link to={`/info?id=${movieObj.id}`}>
          <div
            className="absolute bottom-0 w-full bg-black/60 backdrop-blur-md text-white text-center 
          text-xs sm:text-sm md:text-base p-3 sm:p-4 hover:bg-black/80 transition-all duration-300"
          >
            <span className="font-medium">
              {title.length > 20
                ? `${title.slice(0, 20)}...`
                : title}
            </span>
          </div>
        </Link>

        <div className="absolute top-3 right-3 flex gap-2 flex-col">
          <div
            className="floating-action p-2 rounded-full neon-glow-purple"
          >
            <span className="text-xs sm:text-sm font-medium text-white">
              ⭐{" "}
              {movieObj.vote_average ? movieObj.vote_average.toFixed(1) : "N/A"}
            </span>
          </div>

          <Link
            to={`/info?id=${movieObj.id}`}
            className="floating-action p-2 rounded-full flex items-center justify-center neon-glow-blue"
          >
            <Info className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </Link>

          <button
            className={`floating-action p-2 rounded-full flex items-center justify-center ${
                isLiked ? "neon-glow-pink" : ""
              }`}
            onClick={liked}
          >
            <Heart
              className={`w-3 h-3 sm:w-4 sm:h-4 text-white
                ${isLiked ? "fill-white" : "fill-transparent"}`}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
