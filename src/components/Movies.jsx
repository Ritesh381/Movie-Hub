import React from "react";
import Trending from "./Trending";
import Banner from "./Banner";
import "./main.css";
import Discover from "./Discover";
import Upcoming from "./Upcoming";

function Movies() {
  return (
    <div>
      <Banner />
      <Trending />
      <br />
      <Upcoming />
      <br />
      <Discover />
    </div>
  );
}

export default Movies;
