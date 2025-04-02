import { useContext } from "react";
import genreData from "../assets/genre.json";
import { MyContext } from "./Context/WatchListContext";
import { Link } from "react-router-dom";

function WatchListDetail({ searchField, activeGenre }) {
  const { watchList, setWatchList } = useContext(MyContext);

  const removeFromWatchList = (movieObj) => {
    const updatedList = watchList.filter((movie) => movie.id !== movieObj.id);
    setWatchList(updatedList);
    localStorage.setItem("watchList", JSON.stringify(updatedList));
  };

  return (
    <div className="text-amber-200 p-2 md:p-5">
      {watchList.length === 0 ? (
        <p className="text-center text-xl font-semibold">
          No movies in your watchlist 😢
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-amber-400 text-white text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="bg-amber-600">
                <th className="p-1 sm:p-2 md:p-3 border border-amber-400">Poster</th>
                <th className="p-1 sm:p-2 md:p-3 border border-amber-400">Name</th>
                <th className="p-1 sm:p-2 md:p-3 border border-amber-400">Genre</th>
                <th className="p-1 sm:p-2 md:p-3 border border-amber-400">Rating</th>
                <th className="p-1 sm:p-2 md:p-3 border border-amber-400">Popularity</th>
                <th className="p-1 sm:p-2 md:p-3 border border-amber-400">Remove</th>
              </tr>
            </thead>
            <tbody>
              {watchList
                .filter((movie) => {
                  let x = false;
                  if (movie.genre_ids) {
                    for (let id of movie.genre_ids) {
                      if (activeGenre == "All Genre") {
                        x = true;
                        break;
                      }
                      if (genreData[id] === activeGenre) {
                        x = true;
                        break;
                      }
                    }
                  }
                  return movie.title.toLowerCase().includes(searchField) && x;
                })
                .map((mov) => (
                  <tr
                    key={mov.id}
                    className="border border-amber-400 text-center"
                  >
                    {/* Movie Poster */}
                    <td className="p-1 sm:p-2 md:p-3 border border-amber-400">
                      {mov.poster_path || mov.backdrop_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original/${
                            mov.poster_path || mov.backdrop_path
                          }`}
                          className="h-[60px] w-[40px] sm:h-[90px] sm:w-[60px] md:h-[150px] md:w-[100px] rounded-lg shadow-md mx-auto"
                          alt="Movie Poster"
                        />
                      ) : (
                        <span className="text-xs md:text-base">No Image</span>
                      )}
                    </td>
                    {/* Movie Name */}
                    <td className="p-1 sm:p-2 md:p-3 border border-amber-400 font-semibold text-xs sm:text-lg md:text-2xl">
                      <Link to="/info" state={{ movie: mov }}>
                        {mov.title}
                      </Link>
                    </td>
                    {/* Genre */}
                    <td className="p-1 sm:p-2 md:p-3 border border-amber-400 font-semibold text-xs sm:text-base md:text-xl">
                      <ul className="space-y-0 md:space-y-1">
                        {mov.genre_ids.slice(0, 3).map((id) => (
                          <li key={id}>{genreData[id] || ""}</li>
                        ))}
                        {mov.genre_ids.length > 3 && (
                          <li className="text-xs text-amber-400">+{mov.genre_ids.length - 3} more</li>
                        )}
                      </ul>
                    </td>

                    {/* Rating */}
                    <td className="p-1 sm:p-2 md:p-3 border border-amber-400 font-bold text-yellow-400">
                      ⭐ {mov.vote_average ? mov.vote_average.toFixed(1) : "N/A"}
                    </td>
                    {/* popularity */}
                    <td className="p-1 sm:p-2 md:p-3 border border-amber-400 font-bold text-yellow-400">
                      {mov.popularity.toFixed(1)}
                    </td>
                    {/* Remove Button */}
                    <td className="p-1 sm:p-2 md:p-3 border border-amber-400">
                      <button
                        onClick={() => removeFromWatchList(mov)}
                        className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-lg shadow-md text-xs sm:text-sm md:text-base"
                      >
                        <span className="hidden sm:inline">Remove </span>❌
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default WatchListDetail;