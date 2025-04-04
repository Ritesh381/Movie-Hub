import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../../assets/key";
import BannerSlider from "./BannerSlider";

function Banner() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);

  useEffect(() => {
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
      })
      .catch((error) => console.log("Error: " + error));
  }, []);

  const handelSearch = () => {
    if (searchQuery.trim()) {
      console.log(searchQuery.trim());
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
    <div className="w-full overflow-hidden relative">
      <BannerSlider banners={banners} />

      {/* Searching area */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="relative inline-block mb-2">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md rounded-lg -z-10"></div>
            <p className="text-orange-300 font-bold text-xl md:text-2xl lg:text-3xl px-4 py-2 relative">
              What movie are you wondering of?
            </p>
          </div>

          <div className="flex">
            <input
              value={searchQuery}
              onKeyDown={handelKeyDown}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search for Movies"
              className="bg-white w-full text-base md:text-xl p-2 md:p-3 rounded-l-2xl border-blue-300"
            />
            <button
              className="bg-gray-200 w-16 md:w-20 rounded-r-2xl text-base md:text-xl"
              onClick={handelSearch}
            >
              🔍
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
