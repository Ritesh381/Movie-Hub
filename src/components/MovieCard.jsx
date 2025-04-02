import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "./Context/WatchListContext";
import { Info, Heart } from 'lucide-react';

function MovieCard({ movieObj, height=60, width=40}) {
  const { watchList, setWatchList } = useContext(MyContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const liked = watchList.some((mov) => movieObj.id === mov.id);
    setIsLiked(liked);
  }, [watchList, movieObj.id]);

  function liked() {
    const updatedList = isLiked
      ? watchList.filter((movie) => movie.id !== movieObj.id)
      : [...watchList, movieObj];
    
    setWatchList(updatedList);
    localStorage.setItem("watchList", JSON.stringify(updatedList));
    setIsLiked(!isLiked);
  }

  return (
    <div className={`relative flex-shrink-0 w-${width} sm:w-48 md:w-56 h-${height} sm:h-72 md:h-80 
      rounded-lg overflow-hidden shadow-lg 
      hover:scale-105 duration-300 group`}>
      {movieObj.poster_path || movieObj.backdrop_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${
            movieObj.poster_path || movieObj.backdrop_path
          }`}
          className="w-full h-full object-cover"
          alt={`Poster for ${movieObj.title}`}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <span className="text-amber-400 text-sm text-center">
            No Image Available
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex flex-col justify-end">
        <div className="absolute bottom-0 w-full bg-black/70 text-white text-center 
          text-xs sm:text-sm md:text-base p-1 sm:p-2">
          {movieObj.title.length > 20 
            ? `${movieObj.title.slice(0, 20)}...` 
            : movieObj.title}
        </div>

        <div className="absolute top-2 right-2 flex gap-2 space-x-1">
          <div className="text-white bg-black/50 p-1 sm:p-2 rounded-full 
            hover:bg-black/70 flex items-center">
            <span className="text-xs sm:text-sm">
            ⭐ {movieObj.vote_average ? movieObj.vote_average.toFixed(1) : "N/A"}
            </span>
          </div>

          <Link
            to={`/info?id=${movieObj.id}`}
            state={{ movie: movieObj }}
            className="text-white bg-black/50 p-1 sm:p-2 rounded-full 
              hover:bg-black/70 flex items-center justify-center"
          >
            <Info className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>

          <button
            className="text-red-600 bg-black/50 p-1 sm:p-2 rounded-full 
              hover:bg-black/70 flex items-center justify-center"
            onClick={liked}
          >
            <Heart 
              className={`w-3 h-3 sm:w-4 sm:h-4 
                ${isLiked ? 'fill-red-600' : 'fill-transparent'}`} 
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;