import React, { useState, useEffect } from "react";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/api/movies")
      .then((response) => response.json())
      .then((result) => setMovies(result.data))
      .then(console.log(movies))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
