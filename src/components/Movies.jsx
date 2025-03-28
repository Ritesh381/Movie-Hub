import React from "react";
import Trending from "./Trending";
import Banner from "./Banner";
import "./main.css";
import Discover from "./Discover";
import Upcoming from "./Upcoming";
import TopRated from "./TopRated";

function Movies() {
  return (
    <div>
      <Banner />
      <Trending />
      <br />
      <Upcoming />
      <br />
      <TopRated />
      <br />
      <Discover />
      <br />
    </div>
  );
}

export default Movies;
