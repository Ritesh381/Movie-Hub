import React, { useEffect, useState } from 'react'
import HorizontalView from '../commonComponents/HorizontalView'
import { API_KEY } from '../../assets/key';
import axios from 'axios';
import { MiniLoader } from '../commonComponents/CircularLoader';
function TopRated() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      axios
        .get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        )
        .then((response) => {
          setMovies(response.data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error: " + error);
          setIsLoading(false);
        });
    }, []);
  
    return (
      <div className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8">
        <h1 className="text-xl md:text-2xl font-medium text-white self-start mb-6">
          ⭐ Top Rated
        </h1>
  
        {isLoading ? (
          <div className="flex justify-center items-center h-80">
            <MiniLoader size={60} />
          </div>
        ) : (
          <HorizontalView movies={movies} showMorePage={"top-rated"}/>
        )}
      </div>
    );
}

export default TopRated