import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function MovieCardLite({ movieObj }) {
  useEffect(() => {
    console.log(movieObj);
  }, []);
  return (
    <div
      className="relative flex-shrink-0 w-35 h-50
      rounded-lg overflow-hidden shadow-lg 
      hover:scale-105 duration-300 group"
    >
      {movieObj.poster_path || movieObj.backdrop_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${
            movieObj.poster_path || movieObj.backdrop_path
          }`}
          className="object-cover"
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
        <Link
          to={`/info?id=${movieObj.id}`}
          className="text-white bg-black/50 p-1 sm:p-2 rounded-full 
            hover:bg-black/70 flex items-center justify-center"
        >
          <div
            className="absolute bottom-0 w-full bg-black/70 text-white text-center 
              text-xs sm:text-sm md:text-base p-1 sm:p-2"
          >
            {movieObj.title.length > 10
              ? `${movieObj.title.slice(0, 10)}...`
              : movieObj.title}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MovieCardLite;
