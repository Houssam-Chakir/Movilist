import { useEffect, useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const KEY = "c4a79159";

export function useMovies(query) {
  const [movies, setMovies] = useState(tempMovieData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setErrorMsg("");

          if (query?.length < 3) {
            setMovies(tempMovieData);
            return;
          }

          const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`, { signal: controller.signal });
          const data = await res.json();
          console.log("data: ", data);

          if (!res.ok) throw new Error("Something went wrong with loading movies");
          if (data.Response === "False") throw new Error(data.Error);

          // eslint-disable-next-line no-unused-vars
          setMovies((movies) => (movies = data.Search));
          console.log("movies: ", movies);
        } catch (error) {
          console.log("error", error);
          if (error.name !== "AbortError") {
            setErrorMsg(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovies();

      return () => controller.abort();
    },
    [query]
  );

  return { movies, isLoading, errorMsg, setMovies };
}
