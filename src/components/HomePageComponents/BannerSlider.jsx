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
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] flex items-center justify-center overflow-hidden pointer-events-none">
      {banners.map((mov, i) => (
        <Link to={`/info?id=${mov.id}`} className="group">
        <div
          key={mov.id}
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-[85%] sm:w-[80%] md:w-[75%] h-full transition-opacity duration-[1500ms] z-0 pointer-events-none ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Blurred bg to fill extra space on the sides */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center blur-2xl scale-110 z-0 pointer-events-none"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${mov.backdrop_path})`,
            }}
          ></div>

          <img
            src={`https://image.tmdb.org/t/p/original/${mov.backdrop_path}`}
            alt={mov.title}
            className="absolute inset-0 w-full h-full  object-cover rounded-xl shadow-lg transition-opacity duration-[4500ms] z-0 pointer-events-none"
          />

          <div className="absolute top-6 left-6 z-10 pointer-events-auto">
            <div className="bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full transition-all duration-300 z-10 group-hover:bg-black/80 group-hover:scale-105 border border-white/20 group-hover:border-white/40 cursor-pointer">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold group-hover:text-cyan-300 transition-colors duration-300 z-10">
                {mov.title}
              </h2>
            </div>
          </div>
        </div>
        </Link>
      ))}

      {/* Left button */}
      <button
        onClick={() => {
          console.log("Left arrow clicked");
          handleManualChange("prev");
        }}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 z-50 hover:scale-110 border border-white/30 hover:border-white/60 group cursor-pointer"
        style={{ pointerEvents: "auto" }}
      >
        <ChevronLeft
          size={28}
          className="group-hover:text-cyan-300 transition-colors duration-300"
        />
      </button>

      {/* Right button */}
      <button
        onClick={() => {
          console.log("Right arrow clicked");
          handleManualChange("next");
        }}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 z-50 hover:scale-110 border border-white/30 hover:border-white/60 group cursor-pointer"
        style={{ pointerEvents: "auto" }}
      >
        <ChevronRight
          size={28}
          className="group-hover:text-cyan-300 transition-colors duration-300"
        />
      </button>
    </div>
  );
};

export default BannerSlider;
