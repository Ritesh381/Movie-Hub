import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../assets/key";
import MovieCardLite from "./MovieCardLite";

function Message({ msgObj }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (msgObj.msg.movieIds.length > 0) {
      msgObj.msg.movieIds.forEach((id) => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
          )
          .then((res) => {
            setMovies((prevMovies) => [...prevMovies, res.data]);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }, []);

  return (
    <div className="flex flex-col bg-gray-300 rounded-2xl p-2 mt-2 md-2">
      <p className="font-bold text-xl">{msgObj.user}</p>
      <div>
        {msgObj.msg.message.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}

        {movies.length > 0 && (
          <div className="flex overflow-x-auto space-x-3 m-auto p-3">
            {movies.map((mov, index) => (
              <MovieCardLite key={index} movieObj={mov} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
