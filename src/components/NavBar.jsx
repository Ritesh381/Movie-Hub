import React, { useState } from "react";
import "./main.css";
import logo from "../assets/movieHubLogo.png";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-orange-300 justify-start px-2 py-2">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 w-12 md:h-16 md:w-16" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center font-bold space-x-4 lg:space-x-6">
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/watchlist" className="hover:text-white transition-colors">
            WatchList
          </Link>
          <Link to="/trending" className="hover:text-white transition-colors">
            Trending
          </Link>
          <Link
            to="/recommend"
            className="flex items-center space-x-1 hover:text-white transition-colors"
          >
            <span className="text-violet-700 text-sm">AI</span>
            <span>Recommendation</span>
          </Link>
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
        <div className="absolute top-full left-0 w-full bg-orange-300 md:hidden">
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link
              to="/"
              className="w-full text-center py-2 hover:bg-orange-400"
              onClick={toggleMenu}
            >
              Movies
            </Link>
            <Link
              to="/watchlist"
              className="w-full text-center py-2 hover:bg-orange-400"
              onClick={toggleMenu}
            >
              WatchList
            </Link>
            <Link
              to="/trending"
              className="w-full text-center py-2 hover:bg-orange-400"
              onClick={toggleMenu}
            >
              Trending
            </Link>
            <Link
              to="/recommend"
              className="w-full text-center py-2 hover:bg-orange-400 flex justify-center items-center space-x-2"
              onClick={toggleMenu}
            >
              <span className="text-violet-700 text-sm">AI</span>
              <span>Recommendation</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
