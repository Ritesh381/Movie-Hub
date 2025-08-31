import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../assets/key";
import MovieCardLite from "./MovieCardLite";

function Message({ msgObj }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    if (msgObj.msg.movieNames?.length > 0) {
      setLoading(true);
      setError(null);
      
      const fetchMovies = async () => {
        try {
          const moviePromises = msgObj.msg.movieNames.map(name =>
            axios.get(
              `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(name)}&include_adult=false&language=en-US&page=1`,
              { signal: controller.signal }
            )
          );

          const responses = await Promise.all(moviePromises);
          const foundMovies = responses.map(res => 
            res.data.results?.[0] || null
          ).filter(Boolean);

          setMovies(foundMovies);
        } catch (err) {
          if (!axios.isCancel(err)) {
            console.error("Fetch error:", err);
            setError("Failed to load some movies. Please try again.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }

    return () => controller.abort();
  }, [msgObj]); // Re-run if msgObj changes

  return (
    <div className="flex flex-col bg-blue-500 rounded-2xl p-2 mt-2 md-2">
      <p className="font-bold text-xl">{msgObj.user}</p>
      <div>
        {msgObj.msg.message.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}

        {loading && <p className="text-gray-500">Loading movies...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {movies.length > 0 && (
          <div className="flex overflow-x-auto space-x-3 m-auto p-3">
            {movies.map((mov) => (
              <MovieCardLite key={mov.id} movieObj={mov} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;