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
import { FullScreenLoader } from "../commonComponents/CircularLoader";
import { useLoadingProgress } from "../../hooks/useLoadingProgress";

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
  const progress = useLoadingProgress(isLoading);

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
    } else {
      // add to watchList
      const updatedList = [...watchList, movie];
      setWatchList(updatedList);
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
    return (
      <>
        <FullScreenLoader
          progress={progress}
          text="Loading Movie Details..."
          subText="Fetching trailers, cast info, and recommendations"
        />
        <InfoLoading />
      </>
    );
  }

  if (!movie?.id) {
    return (
      <div className="min-h-screen bg-ultra-black flex items-center justify-center">
        <div className="text-white text-4xl font-bold">
          No movie data available 😟
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ultra-black text-white">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {movie.backdrop_path && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              className="w-full h-full object-cover"
              alt={`${title} Backdrop`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ultra-black via-black/70 to-black/30"></div>
          </>
        )}

        {/* Floating particles for ambiance */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-32 right-20 w-3 h-3 bg-pink-500 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute bottom-40 left-20 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-40"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-32 z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Movie Info Card */}
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl border border-white/20 p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Movie Poster */}
            <div className="flex-shrink-0 w-full lg:w-80 mx-auto lg:mx-0">
              {movie.poster_path || movie.backdrop_path ? (
                <div className="relative group">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.backdrop_path
                      }`}
                    className="w-full lg:w-80 rounded-2xl shadow-2xl object-cover transform group-hover:scale-105 transition-all duration-300"
                    alt={`${title} Poster`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ) : (
                <div className="w-full lg:w-80 h-96 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                  <span className="text-white/60">No Image Available</span>
                </div>
              )}
            </div>

            {/* Movie Details */}
            <div className="flex flex-col justify-start flex-grow">
              <div className="flex items-center mb-6">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {title}
                </h1>
                <button
                  className="text-red-500 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-red-500/20 hover:scale-110 ml-4 transition-all duration-300 border border-white/20"
                  onClick={handleLike}
                  aria-label={
                    isLiked ? "Remove from watchlist" : "Add to watchlist"
                  }
                >
                  <FontAwesomeIcon
                    icon={isLiked ? solidHeart : regularHeart}
                    className={`text-xl ${isLiked ? "animate-pulse" : ""}`}
                  />
                </button>
              </div>

              <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed">
                {movie.overview || "No description available"}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                {ytLink && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/50"
                  >
                    🎬 Watch Trailer
                  </button>
                )}

                {movie.homepage && (
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/50"
                  >
                    🏠 Official Site
                  </a>
                )}

                {movie.imdb_id && (
                  <a
                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-500/50"
                  >
                    <FontAwesomeIcon icon={faImdb} className="mr-2 text-lg" />
                    IMDB
                  </a>
                )}

                {(movie.release_date || movie.first_air_date) && (
                  <button
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/50"
                    onClick={handleWatchMovie}
                  >
                    🎬 Watch Now
                  </button>
                )}
              </div>

              {funDesc && (
                <p className="text-cyan-300 text-lg italic mb-4 bg-white/5 p-4 rounded-2xl border border-cyan-500/20">
                  {funDesc}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Movie Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movie.vote_average > 0 && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center text-amber-400">
                <span className="text-2xl mr-3">⭐</span>
                <div>
                  <div className="font-bold text-lg">{movie.vote_average.toFixed(1)}/10</div>
                  <div className="text-white/60 text-sm">({movie.vote_count.toLocaleString()} votes)</div>
                </div>
              </div>
            </div>
          )}

          {date && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center text-blue-400">
                <span className="text-2xl mr-3">📅</span>
                <div>
                  <div className="font-bold text-lg">Release Date</div>
                  <div className="text-white/80">{date}</div>
                </div>
              </div>
            </div>
          )}

          {movie.genres && movie.genres.length > 0 && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center text-purple-400">
                <span className="text-2xl mr-3">🎭</span>
                <div>
                  <div className="font-bold text-lg">Genres</div>
                  <div className="text-white/80">{movie.genres.map((g) => g.name).join(", ")}</div>
                </div>
              </div>
            </div>
          )}

          {movie.original_language && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center text-green-400">
                <span className="text-2xl mr-3">🗣</span>
                <div>
                  <div className="font-bold text-lg">Language</div>
                  <div className="text-white/80">
                    {new Intl.DisplayNames(["en"], { type: "language" }).of(
                      movie.original_language
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {movie.runtime > 0 && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center text-orange-400">
                <span className="text-2xl mr-3">⏳</span>
                <div>
                  <div className="font-bold text-lg">Runtime</div>
                  <div className="text-white/80">
                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                  </div>
                </div>
              </div>
            </div>
          )}

          {movie.budget > 0 && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center text-emerald-400">
                <span className="text-2xl mr-3">💸</span>
                <div>
                  <div className="font-bold text-lg">Budget</div>
                  <div className="text-white/80">${(movie.budget / 1000000).toFixed(1)}M</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recommendations Section */}
        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            🎬 You Might Also Like
          </h2>
          <Recomendation />
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && ytLink && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20"
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
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-colors duration-300 shadow-lg"
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
