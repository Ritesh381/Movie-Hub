import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../assets/key";
import VerticalView from "../commonComponents/VerticalView";
import Pagination from "../commonComponents/Pagination";

function Recomendation() {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => { 
    let movID = new URLSearchParams(location.search).get("id");
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movID}/recommendations?api_key=${API_KEY}&language=en-US&page=${pageNo}`
      )
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => console.log("Error: " + error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo, location.search]);

  if (movies.length == 0) return <></>;
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-orange-300 my-5">
        More like this
      </h1>

      <VerticalView movies={movies}/>
      <Pagination pageNo={pageNo} setPageNo={setPageNo} totalPages={totalPages}/>
      
    </div>
  );
}

export default Recomendation;
