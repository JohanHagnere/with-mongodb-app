import React, { useState, useEffect } from "react";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/api/movies")
      .then((response) => response.json())
      .then((result) => setMovies(result.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h2>Movies</h2>
      <div
        className="flex__cards"
        style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}
      >
        {movies?.map((movie) => (
          <div
            className="card"
            key={movie.title}
            style={{
              display: "inlineBlock",
              width: 200,
              backgroundColor: "rgba(128, 128, 128, 0.475)",
              padding: "1rem",
              borderRadius: "10px",
            }}
          >
            <h3 className="card__title">{movie.title}</h3>
            <img
              src={movie.poster}
              alt={movie.title}
              style={{ width: "100%" }}
            />
            <p className="card__plot">{movie.plot}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Movies;
