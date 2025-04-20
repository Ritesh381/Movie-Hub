import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import Recomendation from "./Recomendation";
import { MyContext } from "../Context/WatchListContext";
import { MySwitchContext } from "../Context/MovieTVcontext";
import axios from "axios";
import { API_KEY } from "../../assets/key";
import { getFunDesc } from "./prompt";
import InfoLoading from "./InfoLoading";

function Info() {
  const { watchList, setWatchList } = useContext(MyContext);
  const { switchmov } = useContext(MySwitchContext);
  const location = useLocation();
  const [movie, setMovie] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [ytLink, setytLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [funDesc, setFunDesc] = useState("");

  const title = movie?.title || movie?.name || "Untitled";

  const date = movie?.release_date || movie?.first_air_date || "No date found";

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);

      try {
        const movID = new URLSearchParams(location.search).get("id");
        if (!movID) {
          throw new Error("No movie ID provided");
        }

        // Fetch movie details
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/${switchmov}/${movID}?api_key=${API_KEY}&language=en-US`
        );
        setFunDesc(
          getFunDesc({
            movieName: movieResponse.data.title,
            releaseDate: movieResponse.data.release_data,
            lang: movieResponse.data.original_language,
          })
        );
        setMovie(movieResponse.data);

        // Fetch trailer
        const videosResponse = await axios.get(
          `https://api.themoviedb.org/3/${switchmov}/${movID}/videos?api_key=${API_KEY}`
        );

        if (
          videosResponse.data.results &&
          videosResponse.data.results.length > 0
        ) {
          // Find trailer if available
          const trailer =
            videosResponse.data.results.find(
              (video) => video.type === "Trailer" && video.site === "YouTube"
            ) || videosResponse.data.results[0];

          setytLink(trailer.key);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [location.search, switchmov]);

  useEffect(() => {
    if (!movie?.id) return;
    const isMovieLiked = watchList.some((mov) => mov.id === movie.id);
    setIsLiked(isMovieLiked);
  }, [watchList, movie]);

  const handleLike = () => {
    if (!movie?.id) return;

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
  };

  const handleWatchMovie = (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "⚠️ This will take you to an external website (AttackerTV). The movie might or might not be available there, but it's free to watch. Do you want to continue? If the link doesn't work use VPN"
    );
    if (userConfirmed) {
      window.open(
        `https://attackertv.so/search/${title.replace(/\s+/g, "-")}`,
        "_blank"
      );
    }
  };

  if (isLoading) {
    return <InfoLoading />;
  }

  if (!movie?.id) {
    return (
      <div className="text-white flex justify-center m-9 text-4xl">
        No movie data available 😟
      </div>
    );
  }

  return (
    <div className="text-white max-w-7xl mx-auto p-4 md:p-6 bg-gray-900 rounded-lg shadow-lg transition-all">
      {/* Movie Poster + Details */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Movie Poster with skeleton loading */}
        <div className="flex-shrink-0 w-full md:w-64 mx-auto md:mx-0">
          {movie.poster_path || movie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${
                movie.poster_path || movie.backdrop_path
              }`}
              className="w-full md:w-64 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 object-cover"
              alt={`${title} Poster`}
              loading="lazy"
            />
          ) : (
            <div className="w-full md:w-64 h-96 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No Image Available</span>
            </div>
          )}
        </div>

        {/* Movie Details */}
        <div className="flex flex-col justify-start flex-grow">
          <div className="flex items-center mb-3">
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
            <button
              className="text-red-600 bg-black/50 p-2 rounded-full hover:bg-black/70 ml-2 transition-colors duration-300"
              onClick={handleLike}
              aria-label={
                isLiked ? "Remove from watchlist" : "Add to watchlist"
              }
            >
              <FontAwesomeIcon
                icon={isLiked ? solidHeart : regularHeart}
                className={`${isLiked ? "animate-pulse" : ""}`}
              />
            </button>
          </div>

          <p className="text-gray-300 text-base md:text-lg mb-4">
            {movie.overview || "No description available"}
          </p>

          <div className="flex flex-wrap overflow-auto gap-3 mt-2">
            {ytLink && (
              <button
                onClick={() => setShowTrailer(true)}
                className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors duration-300"
              >
                🎬 Watch Trailer
              </button>
            )}

            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                🏠 Official Site
              </a>
            )}

            {movie.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-400 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faImdb} className="mr-2 text-lg" />
                IMDB
              </a>
            )}

            {(movie.release_date || movie.first_air_date) && (
              <a
                href="#"
                className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors duration-300"
                onClick={handleWatchMovie}
              >
                🎬 Watch Now
              </a>
            )}
          </div>

          <p className="text-gray-300 text-base md:text-lg mt-2 mb-2">
            {funDesc}
          </p>
        </div>
      </div>

      <hr className="m-3" />
      {/* Additional Information */}
      <div className="flex-col ml-5 ">
        {movie.vote_average > 0 && (
          <div className="flex items-center text-base md:text-lg">
            <span className="text-amber-300 flex items-center">
              <span className="mr-2">⭐</span>
              <span className="font-semibold">Rating:</span>
              <span className="ml-2">{movie.vote_average.toFixed(1)}/10</span>
              <span className="text-gray-400 ml-2">
                ({movie.vote_count.toLocaleString()} votes)
              </span>
            </span>
          </div>
        )}

        {date && (
          <div className="flex items-center text-base md:text-lg">
            <span className="mr-2">📅</span>
            <span className="font-semibold">Release Date:</span>
            <span className="ml-2">{date}</span>
          </div>
        )}

        {movie.genres && movie.genres.length > 0 && (
          <div className="flex items-center text-base md:text-lg">
            <span className="mr-2">🎭</span>
            <span className="font-semibold">Genre:</span>
            <span className="ml-2">
              {movie.genres.map((id) => id.name).join(", ")}
            </span>
          </div>
        )}

        {movie.original_language && (
          <div className="flex items-center text-base md:text-lg">
            <span className="mr-2">🗣</span>
            <span className="font-semibold">Language:</span>
            <span className="ml-2">
              {new Intl.DisplayNames(["en"], { type: "language" }).of(
                movie.original_language
              )}
            </span>
          </div>
        )}

        {movie.budget > 0 && (
          <div className="flex items-center text-base md:text-lg">
            <span className="mr-2">💸</span>
            <span className="font-semibold">Budget:</span>
            <span className="ml-2">
              ${(movie.budget / 1000000).toFixed(1)} M
            </span>
          </div>
        )}

        {movie.origin_country && movie.origin_country.length > 0 && (
          <div className="flex items-center text-base md:text-lg">
            <span className="mr-2">🌎</span>
            <span className="font-semibold">Origin country:</span>
            <span className="ml-2">
              {new Intl.DisplayNames(["en"], { type: "region" }).of(
                movie.origin_country[0]
              )}
            </span>
          </div>
        )}

        {movie.revenue > 0 && (
          <div className="flex items-center text-base md:text-lg">
            <span className="mr-2">💰</span>
            <span className="font-semibold">Revenue:</span>
            <span className="ml-2">
              ${(movie.revenue / 1000000).toFixed(1)} M
            </span>
          </div>
        )}

        {movie.runtime > 0 && (
          <div className="flex items-center text-base md:text-lg">
            <span className="mr-2">⏳</span>
            <span className="font-semibold">Runtime:</span>
            <span className="ml-2">
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </span>
          </div>
        )}

        {movie.popularity > 0 && (
          <div className="flex items-center text-base md:text-lg">
            <span className="mr-2">🔥</span>
            <span className="font-semibold">Popularity:</span>
            <span className="ml-2">{movie.popularity.toFixed(1)}</span>
          </div>
        )}

        <div className="flex items-center text-base md:text-lg">
          <span className="mr-2">🔞</span>
          <span className="font-semibold">Adult:</span>
          <span className="ml-2">{movie.adult ? "Yes" : "No"}</span>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="mt-8">
        <Recomendation />
      </div>
      {showTrailer && ytLink && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${ytLink}?autoplay=1`}
              title="Movie Trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
              aria-label="Close trailer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Info;
