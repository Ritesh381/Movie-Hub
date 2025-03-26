import { useContext } from "react";
import genreData from "../assets/genre.json";
import { MyContext } from "./Context/WatchListContext";
import MovieCard from "./MovieCard";

function WatchListCard({searchField, activeGenre}) {
  const { watchList } = useContext(MyContext);

  return (
    <div className="text-amber-200 p-5">
      {watchList.length === 0 ? (
        <p className="text-center text-xl font-semibold">
          No movies in your watchlist 😢
        </p>
      ) : (
        <div className="grid grid-cols-6 gap-6">
          {watchList
            .filter((movie) => {
              let matchesGenre = false;
              for (let id of movie.genre_ids) {
                if (activeGenre === "All Genre") {
                  matchesGenre = true;
                  break;
                }
                if (genreData[id] === activeGenre) {
                  matchesGenre = true;
                  break;
                }
              }
              return (
                movie.title.toLowerCase().includes(searchField) && matchesGenre
              );
            })
            .map((movie) => (
              <MovieCard key={movie.id} movieObj={movie} />
            ))}
        </div>
      )}
    </div>
  );
}

export default WatchListCard;
