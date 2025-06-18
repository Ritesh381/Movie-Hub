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
      <div className="-mt-8">
        <Trending />
      </div>
      <div className="mt-12">
        <Upcoming />
      </div>
      <div className="mt-12">
        <TopRated />
      </div>
      <div className="mt-12">
        <Discover />
      </div>
    </div>
  );
}

export default Movies;
