import React, { useRef, useState } from "react";

function FindMovieById() {
  const inputRef = useRef(null);
  const [movie, setMovie] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
    fetch("/api/movie/" + inputRef.current.value)
      .then((response) => response.json())
      .then((result) => setMovie(result.data.movie))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Movie Id:
          <input type="text" ref={inputRef} style={{ margin: ".5rem" }} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {movie && (
        <div
          className="card"
          key={movie.title}
          style={{
            display: "inlineBlock",
            width: 200,
            backgroundColor: "rgba(128, 128, 128, 0.475)",
            padding: "1rem",
            borderRadius: "10px",
            marginTop: "1rem",
          }}
        >
          <h3 className="card__title">{movie.title}</h3>
          {movie.poster && (
            <img
              src={movie.poster}
              alt={movie.title}
              style={{ width: "100%" }}
            />
          )}
          <p className="card__plot">{movie.plot}</p>
        </div>
      )}
    </>
  );
}

export default FindMovieById;
