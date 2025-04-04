import React from "react";
import Trending from "./HomePageComponents/Trending";
import Banner from "./HomePageComponents/Banner";
import Discover from "./HomePageComponents/Discover";
import Upcoming from "./HomePageComponents/Upcoming";
import TopRated from "./HomePageComponents/TopRated";

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
