import { useState, useEffect } from "react";
import movieDB from "../api/movieDB";

export const useMovie = (text_search) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const params =
    text_search.length > 0
      ? {
          params: {
            title: text_search,
            source_content_type: "application/json",
          },
        }
      : "";

  const getMovies = async () => {
    const { data } = await movieDB.get("/movies", params);
    setMovies(data);

    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, [text_search]);

  return { movies, isLoading };
};
