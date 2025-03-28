import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

function HorizontalView({ movies }) {
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    if(movies.length > 0){
      setLoading(false)
    }
  },[movies])
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex space-x-4 sm:space-x-6 pb-4">
        {loading ? (
          <div className="text-white text-lg w-full text-center">
            Loading...
          </div>
        ) : (
          <>
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movieObj={movie}
                className="flex-shrink-0 w-40 sm:w-48 md:w-56"
              />
            ))}

            <div
              className="text-white bg-gray-600 backdrop-blur-lg 
                relative flex-shrink-0 
                w-40 sm:w-48 md:w-56 
                h-[250px] sm:h-[300px] 
                rounded-lg overflow-hidden 
                shadow-lg hover:scale-105 
                duration-300 
                flex flex-col 
                justify-center 
                items-center 
                space-y-4"
            >
              <p className="text-sm sm:text-base">Show More</p>
              <Link
                to={"/trending"}
                className="w-10 h-10 sm:w-14 sm:h-14 
                  flex items-center justify-center 
                  border-2 border-white rounded-full 
                  transition duration-200 
                  active:scale-75 
                  hover:bg-white 
                  hover:text-blue-900"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HorizontalView;
