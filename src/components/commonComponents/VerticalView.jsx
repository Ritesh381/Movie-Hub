import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

function VerticalView({ movies }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movies.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [movies]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
        {loading ? (
          <div className="text-white text-lg">Loading...</div>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} movieObj={movie} />)
        )}
      </div>
    </div>
  );
}

export default VerticalView;
