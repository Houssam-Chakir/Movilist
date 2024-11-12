import { useEffect, useState } from "react";
import StarRating from "./StarRating";

export default function MovieDetails(props) {
  const { KEY, selectedTitle, setSelectedTitle, Loader, ErrorMessage, watched, setWatched } = props;
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  function handleCloseMovie() {
    setSelectedTitle(null);
  }
  function handleAddWatched(movie) {
    console.log("movie: ", movie);
    const newWatchedMovie = movie;
    newWatchedMovie.imdbRating = Number(newWatchedMovie.imdbRating)
    newWatchedMovie.Runtime = Number(newWatchedMovie.Runtime.split(' ').at(0))
    newWatchedMovie.userRating = userRating

    setWatched([...watched, newWatchedMovie]);
    handleCloseMovie()
    setUserRating(0)
  }

  async function fetchMovie() {
    try {
      setIsLoading(true);
      setErrorMsg(null);

      const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&t=${selectedTitle}`);
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log("res.ok: ", res.ok);
        throw new Error("Could not recieve movie details");
      }
      if (data.Response === "False") {
        throw new Error(data.Error);
      }

      setMovie(data);
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
      console.log("setErrorMsg: ", setErrorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovie();
  }, [selectedTitle]);

  return (
    <>
      {isLoading && <Loader />}
      {errorMsg && <ErrorMessage error={errorMsg} />}
      {!errorMsg && (
        <div className='details'>
          <header>
            <button className='btn-back' onClick={handleCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title} movie`} />
            <div className='details-overview'>
              <h2>{movie.Title}</h2>
              <p>{movie.Released}</p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              <StarRating maxRating={10} size={24} onSetExternalRating={setUserRating} />

              {userRating > 0 && <button className='btn-add' onClick={() => handleAddWatched(movie)}>
                + Add to list
              </button>}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </div>
      )}
    </>
  );
}
