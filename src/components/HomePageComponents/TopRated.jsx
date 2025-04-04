import React, { useEffect, useState } from 'react'
import HorizontalView from '../commonComponents/HorizontalView'
import { API_KEY } from '../../assets/key';
import axios from 'axios';
function TopRated() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        )
        .then((response) => {
          setMovies(response.data.results);
          console.log(response.data.results);
        })
        .catch((error) => console.log("Error: " + error));
    }, []);
  
    return (
      <div className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-300 my-4 sm:my-5 self-start">
          Top Rated
        </h1>
  
        <HorizontalView movies={movies} showMorePage={"top-rated"}/>
      </div>
    );
}

export default TopRated