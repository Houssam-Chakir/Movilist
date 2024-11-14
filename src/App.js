import { useState } from "react";
import Box from "./Components/Box.jsx";
import Navbar from "./Components/Navbar";
import SearchResults from "./Components/SearchResults";
import WatchList from "./Components/WatchList";
import { MoviesLength } from "./Components/Navbar.jsx";
import { Results } from "./Components/SearchResults.jsx";
import MovieDetails from "./Components/MovieDetails.jsx";
import { useMovies } from "./useMovies.js";
import { useLocalStorage } from "./useLocalStorage.js";

const KEY = "c4a79159";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedTitle, setSelectedTitle] = useState(null);
  // Custom Hooks
  const {movies, isLoading, errorMsg, setMovies} = useMovies(query)
  const [watched, setWatched] = useLocalStorage([],"watched")

  function Loader() {
    return <p className='loader'>Loading...</p>;
  }
  function ErrorMessage({ error }) {
    return <p className='error'>{"😳 " + error}</p>;
  }


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
          {selectedTitle ? (
            <MovieDetails
              watched={watched}
              setWatched={setWatched}
              Loader={Loader}
              ErrorMessage={ErrorMessage}
              KEY={KEY}
              selectedTitle={selectedTitle}
              setSelectedTitle={setSelectedTitle}
            />
          ) : (
            <WatchList watched={watched} setWatched={setWatched} />
          )}
        </Box>
      </main>
    </>
  );
}
