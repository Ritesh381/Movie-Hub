import { useContext } from "react";
import genreData from "../assets/genre.json";
import { MyContext } from "./Context/WatchListContext";
import MovieCard from "./MovieCard";

function WatchListCard({ searchField, activeGenre }) {
  const { watchList } = useContext(MyContext);

  return (
    <div className="flex text-amber-200 p-2 md:p-5 items-center justify-center">
      {watchList.length === 0 ? (
        <p className="text-center text-xl font-semibold">
          No movies in your watchlist 😢
        </p>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-5 lg:gap-7 w-full">
          {watchList
            .filter((movie) => {
              let matchesGenre = false;
              if (movie.genre_ids) {
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