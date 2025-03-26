import React from "react";
import "./main.css";
import logo from '../assets/movieHubLogo.png'
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="flex items-center bg-orange-300 justify-between">
      <div className="justify-between ml-[15px]">
        <a href="">
          <img
            src= {logo}
            alt="Logo"
            className="size-16"
          />
        </a>
      </div>
      <div className="font-bold flex">
        <Link to="/" className="ml-[10px] mr-[10px]">Movies</Link>
        <Link to="/watchlist" className="ml-[10px] mr-[10px]">WatchList</Link>
        <Link to="/recommend" className="flex ml-[10px] mr-[10px"><p className="flex text-[16px] self-center text-violet-700"> AI </p>Recommendation</Link>
      </div>
      <div className="mr-[15px]">
        <Link to="/login" className="border-2px font-bold m-auto">Login/Signup</Link>
      </div>
    </div>
  );
}

export default NavBar;
