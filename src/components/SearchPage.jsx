import React, { useContext, useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import { API_KEY } from "../assets/key";
import axios from "axios";
import VerticalView from "./commonComponents/VerticalView";
import Pagination from "./commonComponents/Pagination";
import { MySwitchContext } from "./Context/MovieTVcontext";

function SearchPage() {
  const {switchmov} = useContext(MySwitchContext)
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(500);
  const [original, setOriginal] = useState("");

  useEffect(() => {
    let que = new URLSearchParams(location.search).get("q");
    setOriginal(que);
    axios
      .get(
        `https://api.themoviedb.org/3/search/${switchmov}?api_key=${API_KEY}&query=${que}&include_adult=false&language=en-US&page=${pageNo}'`
      )
      .then((response) => {
        console.log(response.data.results)
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      });
  }, [location.search, pageNo, switchmov]);

  return (
    <div className="flex flex-col justify-center items-center text-black">
      {movies.length == 0 ? (
        <p className="text-4xl text-white self-start ml-5">
          No results found for: {original}
        </p>
      ) : (
        <div className="m-6">
          <VerticalView movies={movies} />
          <Pagination
            pageNo={pageNo}
            setPageNo={setPageNo}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
