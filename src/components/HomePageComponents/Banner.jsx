import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_KEY } from "../../assets/key";
import BannerSlider from "./BannerSlider";
import { FullScreenLoader } from "../commonComponents/CircularLoader";
import { useLoadingProgress } from "../../hooks/useLoadingProgress";
import logo from "../../assets/movieHubLogo.png";

function Banner() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const progress = useLoadingProgress(isLoading);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then((response) => {
        let movies = response.data.results;
        movies.forEach((mov) => {
          if (mov.backdrop_path) {
            setBanners(movies.filter((mov) => mov.backdrop_path));
          }
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error: " + error);
        setIsLoading(false);
      });
  }, []);

  const handelSearch = () => {
    if (searchQuery.trim()) {
      let query = searchQuery.trim().replace(/\s+/g, "+");
      navigate(`/search?q=${query}`);
    }
  };

  const handelKeyDown = (e) => {
    if (e.key === "Enter") {
      handelSearch();
    }
  };

  return (
    <div className="w-full h-[85vh] overflow-hidden relative">
      {isLoading && (
        <FullScreenLoader
          progress={progress}
          text="Loading Epic Movies..."
          subText="Fetching the hottest movies just for you"
        />
      )}

      {/* Navigation on Banner */}
      <div className="absolute top-0 left-0 w-full z-40 px-4 py-4 md:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="transform hover:scale-110 transition-all duration-300 group">
              <div className="bg-white/90 backdrop-blur-md rounded-full p-2 md:p-3 lg:p-4 shadow-xl border border-white/30 group-hover:bg-white group-hover:scale-105 transition-all duration-300">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
                />
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className="relative text-white/90 hover:text-white text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:scale-105 group">
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link to="/watchlist" className="relative text-white/90 hover:text-white text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:scale-105 group">
              <span className="relative z-10">WatchList</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link to="/trending" className="relative text-white/90 hover:text-white text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:scale-105 group">
              <span className="relative z-10">Trending</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link to="/upcoming" className="relative text-white/90 hover:text-white text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:scale-105 group">
              <span className="relative z-10">Upcoming</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>

      <BannerSlider banners={banners} />

      {/* Creative Overlay Effects */}
      <div className="absolute inset-0 z-10">
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-70"></div>
        <div className="absolute top-32 right-20 w-3 h-3 bg-pink-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-40 left-20 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-40 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
        <div className="absolute bottom-60 right-10 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-70"></div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20"></div>
      </div>

      {/* Searching area */}
      <div className="absolute inset-0 flex items-center justify-center z-20 px-4 pt-16" style={{ pointerEvents: 'none' }}>
        <div className="w-full max-w-2xl text-center">
          {/* Clean animated title */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 drop-shadow-2xl">
              <span className="inline-block bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                What movie
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
                are you wondering of?
              </span>
            </h1>
          </div>

          {/* Clean search box */}
          <div className="relative group mb-6" style={{ pointerEvents: 'auto' }}>
            <div className="flex items-center bg-black/40 backdrop-blur-xl rounded-full p-2 shadow-2xl border border-white/30 hover:border-white/50 transition-all duration-300">
              <input
                value={searchQuery}
                onKeyDown={handelKeyDown}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search for your next favorite movie..."
                className="flex-1 bg-transparent text-white text-lg md:text-xl placeholder-white/60 px-6 py-4 focus:outline-none font-medium"
                style={{ pointerEvents: 'auto' }}
              />
              <button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl md:text-2xl transition-all duration-300 hover:scale-105 shadow-lg group"
                onClick={handelSearch}
                style={{ pointerEvents: 'auto' }}
              >
                <span className="group-hover:animate-spin transition-transform duration-300">🔍</span>
              </button>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-white/70 text-base md:text-lg font-light tracking-wide">
            Discover millions of movies and TV shows
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
