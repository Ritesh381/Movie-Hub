import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import MovieCardLoading from "./MovieCardLoading";

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
          [1,2,3,4,5].map(()=><MovieCardLoading/>)
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} movieObj={movie} />)
        )}
      </div>
    </div>
  );
}

export default VerticalView;
