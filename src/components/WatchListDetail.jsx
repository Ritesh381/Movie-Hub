import { useContext } from "react";
import genreData from "../assets/genre.json";
import { MyContext } from "./Context/WatchListContext";
import { Link } from "react-router-dom";

function WatchListDetail({searchField, activeGenre}) {
  const {watchList, setWatchList} = useContext(MyContext)
  
  const removeFromWatchList = (movieObj) => {
    const updatedList = watchList.filter((movie) => movie.id !== movieObj.id);
    setWatchList(updatedList);
    localStorage.setItem("watchList", JSON.stringify(updatedList));
  };


  return (
    <div className="text-amber-200 p-5">
      {watchList.length === 0 ? (
        <p className="text-center text-xl font-semibold">
          No movies in your watchlist 😢
        </p>
      ) : (
        <table className="w-full border-collapse border border-amber-400 text-white">
          <thead>
            <tr className="bg-amber-600 text-lg">
              <th className="p-3 border border-amber-400">Poster</th>
              <th className="p-3 border border-amber-400">Name</th>
              <th className="p-3 border border-amber-400">Genre</th>
              <th className="p-3 border border-amber-400">Rating</th>
              <th className="p-3 border border-amber-400">Popularity</th>
              <th className="p-3 border border-amber-400">Remove</th>
            </tr>
          </thead>
          <tbody>
            {watchList
              .filter((movie) => {
                let x = false;
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

                return movie.title.toLowerCase().includes(searchField) && x;
              })
              .map((mov) => (
                <tr
                  key={mov.id}
                  className="border border-amber-400 text-center"
                >
                  {/* Movie Poster */}
                  <td className="p-3 border border-amber-400">
                    {mov.poster_path || mov.backdrop_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/original/${
                          mov.poster_path || mov.backdrop_path
                        }`}
                        className="h-[150px] w-[100px] rounded-lg shadow-md mx-auto"
                        alt="Movie Poster"
                      />
                    ) : (
                      <span>No Image Available</span>
                    )}
                  </td>
                  {/* Movie Name */}
                  <td className="p-3 border text-2xl border-amber-400 font-semibold">
                    <Link to="/info" state={{ movie: mov }}>{mov.title}</Link>
                  </td>
                  {/* Genre */}
                  <td className="p-3 border text-xl border-amber-400 font-semibold">
                    <ul>
                      {mov.genre_ids.map((id) => (
                        <li key={id}>{genreData[id] || ""}</li>
                      ))}
                    </ul>
                  </td>

                  {/* Rating */}
                  <td className="p-3 border border-amber-400 font-bold text-yellow-400">
                    ⭐ {mov.vote_average ? mov.vote_average.toFixed(1) : "N/A"}
                  </td>
                  {/* popularity */}
                  <td className="p-3 border border-amber-400 font-bold text-yellow-400">
                    {mov.popularity.toFixed(3)}
                  </td>
                  {/* Remove Button */}
                  <td className="p-3 border border-amber-400">
                    <button
                      onClick={() => removeFromWatchList(mov)}
                      className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md"
                    >
                      Remove ❌
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WatchListDetail;
