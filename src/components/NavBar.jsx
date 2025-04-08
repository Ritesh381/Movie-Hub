import React, { useState } from "react";
import logo from "../assets/movieHubLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { MySwitchContext } from "./Context/MovieTVcontext";

function NavBar() {
  const navigate = useNavigate();
  // const { switchmov, setSwitch } = useContext(MySwitchContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
      <div className="flex items-center justify-between bg-orange-300 px-4 py-2 md:px-6 lg:px-10">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16"
            />
          </Link>
          {/* <button onClicwk={handelSwitch}>{`Switch ${switchmov}`}</button> */}

          <div className="hidden md:flex items-center font-bold space-x-4 lg:space-x-6 ml-6 lg:ml-10">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link
              to="/watchlist"
              className="hover:text-white transition-colors"
            >
              WatchList
            </Link>
            <Link to="/trending" className="hover:text-white transition-colors">
              Trending
            </Link>
            {/* <Link
              to="/recommend"
              className="flex items-center space-x-1 hover:text-white transition-colors"
            >
              <span className="text-violet-700 text-sm">AI</span>
              <span>Recommendation</span>
            </Link> */}
            <Link
              to={"/upcoming"}
              className="hover:text-white transition-colors"
            >
              Upcoming
            </Link>
          </div>
        </div>
        {/* Search Bar */}
        <div className="flex">
          <input
            value={searchQuery}
            onKeyDown={handelKeyDown}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search for Movies"
            className="bg-white w-full p-2 md:p-3 rounded-l-2xl border-blue-300"
          />
          <button
            className="bg-gray-200 w-16 md:w-20 rounded-r-2xl text-base md:text-xl"
            onClick={handelSearch}
          >
            🔍
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-orange-300 md:hidden z-50">
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link
              to="/watchlist"
              className="w-full text-center py-2 hover:bg-orange-400"
              onClick={toggleMenu}
            >
              WatchList
            </Link>
            <Link
              to="/"
              className="w-full text-center py-2 hover:bg-orange-400"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/trending"
              className="w-full text-center py-2 hover:bg-orange-400"
              onClick={toggleMenu}
            >
              Trending
            </Link>
            {/* <Link
              to="/recommend"
              className="w-full text-center py-2 hover:bg-orange-400 flex justify-center items-center space-x-2"
              onClick={toggleMenu}
            >
              <span className="text-violet-700 text-sm">AI</span>
              <span>Recommendation</span>
            </Link> */}
            <Link
              to={"/upcoming"}
              className="hover:text-white transition-colors"
            >
              Upcoming
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
