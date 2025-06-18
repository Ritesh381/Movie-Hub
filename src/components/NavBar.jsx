import React, { useState } from "react";
import logo from "../assets/movieHubLogo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { MySwitchContext } from "./Context/MovieTVcontext";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Hide navbar on home page
  if (location.pathname === '/') {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  // const handelSwitch = () => {
  //   if (switchmov == "movie") {
  //     setSwitch("tv");
  //   } else {
  //     setSwitch("movie");
  //   }
  // };

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between bg-ultra-black px-4 py-4 md:px-6 lg:px-10">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="transform hover:scale-110 transition-all duration-300 group">
            <div className="bg-white/90 backdrop-blur-md rounded-full p-2 md:p-3 shadow-xl border border-white/30 group-hover:bg-white group-hover:scale-105 transition-all duration-300">
              <img
                src={logo}
                alt="Logo"
                className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
              />
            </div>
          </Link>
          {/* <button onClicwk={handelSwitch}>{`Switch ${switchmov}`}</button> */}

          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 ml-8 lg:ml-16">
            <Link to="/" className="relative text-white/90 hover:text-white text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:scale-105 group">
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/watchlist"
              className="relative text-white/90 hover:text-white text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:scale-105 group"
            >
              <span className="relative z-10">WatchList</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link to="/trending" className="relative text-white/90 hover:text-white text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:scale-105 group">
              <span className="relative z-10">Trending</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link to="/top-rated" className="relative text-white/90 hover:text-white text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:scale-105 group">
              <span className="relative z-10">Top Rated</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to={"/upcoming"}
              className="relative text-white/90 hover:text-white text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:scale-105 group"
            >
              <span className="relative z-10">Upcoming</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to={"/discover"}
              className="relative text-white/90 hover:text-white text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 hover:backdrop-blur-md hover:scale-105 group"
            >
              <span className="relative z-10">Discover</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
        {/* Search Bar */}
        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 group">
          <input
            value={searchQuery}
            onKeyDown={handelKeyDown}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search movies..."
            className="bg-transparent text-white placeholder-white/60 px-4 py-3 md:px-6 md:py-4 text-sm md:text-base focus:outline-none w-48 md:w-64"
          />
          <button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg md:text-xl transition-all duration-300 hover:scale-105 shadow-lg mr-1 group"
            onClick={handelSearch}
          >
            <span className="group-hover:animate-spin transition-transform duration-300">🔍</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-110 transition-all duration-300 focus:outline-none text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-ultra-black/95 backdrop-blur-md md:hidden z-50 border-t border-white/10">
          <div className="flex flex-col items-center py-6 space-y-3">
            <Link
              to="/"
              className="relative text-white/90 hover:text-white px-8 py-3 text-sm font-medium transition-all duration-300 rounded-full hover:bg-white/10 hover:scale-105 group"
              onClick={toggleMenu}
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/watchlist"
              className="relative text-white/90 hover:text-white px-8 py-3 text-sm font-medium transition-all duration-300 rounded-full hover:bg-white/10 hover:scale-105 group"
              onClick={toggleMenu}
            >
              <span className="relative z-10">WatchList</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/trending"
              className="relative text-white/90 hover:text-white px-8 py-3 text-sm font-medium transition-all duration-300 rounded-full hover:bg-white/10 hover:scale-105 group"
              onClick={toggleMenu}
            >
              <span className="relative z-10">Trending</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/top-rated"
              className="relative text-white/90 hover:text-white px-8 py-3 text-sm font-medium transition-all duration-300 rounded-full hover:bg-white/10 hover:scale-105 group"
              onClick={toggleMenu}
            >
              <span className="relative z-10">Top Rated</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to={"/upcoming"}
              className="relative text-white/90 hover:text-white px-8 py-3 text-sm font-medium transition-all duration-300 rounded-full hover:bg-white/10 hover:scale-105 group"
              onClick={toggleMenu}
            >
              <span className="relative z-10">Upcoming</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to={"/discover"}
              className="relative text-white/90 hover:text-white px-8 py-3 text-sm font-medium transition-all duration-300 rounded-full hover:bg-white/10 hover:scale-105 group"
              onClick={toggleMenu}
            >
              <span className="relative z-10">Discover</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
