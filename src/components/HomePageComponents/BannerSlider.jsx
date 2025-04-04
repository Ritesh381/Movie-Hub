import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const BannerSlider = ({ banners }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length === 0) return;
    // Pick random index
    const randomIndex = Math.floor(Math.random() * banners.length);
    setIndex(randomIndex);
  }, [banners]);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(interval);
  }, [index, banners]);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  const handleManualChange = (direction) => {
    if (direction === "next") nextSlide();
    else prevSlide();
  };

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] flex items-center justify-center overflow-hidden">
      {banners.map((mov, i) => (
        <div
          key={mov.id}
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-[85%] sm:w-[80%] md:w-[75%] h-full transition-opacity duration-[1500ms] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Blurred bg to fill extra space on the sides */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center blur-2xl scale-110"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${mov.backdrop_path})`,
            }}
          ></div>

          {/* Main movie image */}
          <img
            src={`https://image.tmdb.org/t/p/original/${mov.backdrop_path}`}
            alt={mov.title}
            className="relative w-full h-full object-cover rounded-xl shadow-lg transition-opacity duration-[4500ms]"
          />

          <Link to={`/info?id=${banners[index]?.id}`} className="group">
            <div className="absolute top-5 left-5 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-lg text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300 group-hover:bg-black/70 group-hover:scale-105 group-hover:text-blue-300">
              {banners[index]?.title}
            </div>
          </Link>
        </div>
      ))}

      {/* Left buton*/}
      <button
        onClick={() => handleManualChange("prev")}
        className="absolute left-5 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition z-10"
      >
        <ChevronLeft size={30} />
      </button>

      {/* Right button */}
      <button
        onClick={() => handleManualChange("next")}
        className="absolute right-5 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition z-10"
      > 
        <ChevronRight size={30} />
      </button>
    </div>
  );
};

export default BannerSlider;
