import React, { useRef, useEffect, useState } from "react";

function UpdateMovie() {
  const titleRef = useRef(null);
  const plotRef = useRef(null);
  const yearRef = useRef(null);
  const posterRef = useRef(null);
  const idRef = useRef(null);

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const id = idRef.current.value;
      const response = await fetch(`/api/movie/${id}`);
      const data = await response.json();
      setMovie(data);
    };

    idRef.current.addEventListener("input", fetchMovie);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = idRef.current.value;
    const title = titleRef.current.value;
    const plot = plotRef.current.value;
    const year = yearRef.current.value;
    const poster = posterRef.current.value;

    const updatedMovie = {
      ...movie,
      title: title || movie.title,
      plot: plot || movie.plot,
      year: year || movie.year,
      poster: poster || movie.poster,
    };

    fetch(`/api/movie/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedMovie),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Movie updated in the database.`);
        titleRef.current.value = null;
        plotRef.current.value = null;
        yearRef.current.value = null;
        posterRef.current.value = null;
        setMovie(null);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form method="PUT" onSubmit={handleSubmit}>
        <label>
          Id:
          <input type="text" style={{ margin: ".5rem" }} required ref={idRef} />
        </label>
        <br />
        <label>
          Title:
          <input type="text" style={{ margin: ".5rem" }} ref={titleRef} />
        </label>
        <br />
        <label htmlFor="textarea">Plot:</label>
        <br />
        <textarea
          name="textarea"
          id="textarea"
          cols="30"
          rows="10"
          ref={plotRef}
        ></textarea>
        <br />
        <label>
          Year:
          <input type="text" style={{ margin: ".5rem" }} ref={yearRef} />
        </label>
        <br />
        <label>
          Poster:
          <input type="text" style={{ margin: ".5rem" }} ref={posterRef} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default UpdateMovie;
