import { useEffect, useState } from "react";
import Box from "./Components/Box.jsx";
import Navbar from "./Components/Navbar";
import SearchResults from "./Components/SearchResults";
import WatchList from "./Components/WatchList";
import { MoviesLength } from "./Components/Navbar.jsx";
import { Results } from "./Components/SearchResults.jsx";
import MovieDetails from "./Components/MovieDetails.jsx";

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

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "c4a79159";
const QUERY = "top gun";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function fetchMovies() {
    try {
      setIsLoading(true);
      setErrorMsg("");

      if (query.length < 3) {
        setMovies([]);
        return;
      }

      const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`);
      const data = await res.json();
      console.log("data: ", data);

      if (!res.ok) throw new Error("Something went wrong with loading movies");
      if (data.Response === "False") throw new Error(data.Error);

      setMovies((movies) => data.Search);
    } catch (error) {
      console.log("error", error.message);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function Loader() {
    return <p className='loader'>Loading...</p>;
  }
  function ErrorMessage({ error }) {
    return <p className='error'>{"😳 " + error}</p>;
  }

  useEffect(
    function () {
      console.log("query: ", query);
      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <Navbar query={query} setQuery={setQuery}>
        <MoviesLength moviesLength={movies?.length} />
      </Navbar>

      <main className='main'>
        <Box>
          <SearchResults movies={movies} setMovies={setMovies} setSelectedTitle={setSelectedTitle}>
            {/* {isLoading ? <Loader /> : error ? <ErrorMessage /> : <Results movies={movies} />} */}
            {isLoading && <Loader />}
            {!isLoading && !errorMsg && <Results selectedTitle={selectedTitle} setSelectedTitle={setSelectedTitle} movies={movies} />}
            {errorMsg && <ErrorMessage error={errorMsg} />}
          </SearchResults>
        </Box>
        <Box>
          {selectedTitle ? <MovieDetails
                              watched={watched}
                              setWatched={setWatched}
                              Loader={Loader}
                              ErrorMessage={ErrorMessage}
                              KEY={KEY}
                              selectedTitle={selectedTitle}
                              setSelectedTitle={setSelectedTitle}
                            />
                          : <WatchList watched={watched} setWatched={setWatched} />}
        </Box>
      </main>
    </>
  );
}
