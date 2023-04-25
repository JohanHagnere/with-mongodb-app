import React, { useRef, useState } from "react";

function PostMovie() {
  const titleRef = useRef(null);
  const plotRef = useRef(null);
  const yearRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const plot = plotRef.current.value;
    const year = yearRef.current.value;

    fetch("/api/movie/", {
      method: "POST",
      body: JSON.stringify({ title, plot, year }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(
          `Movie inserted in the database, id of the movie : ${data.data.movie.insertedId}`
        );
        titleRef.current.value = null;
        plotRef.current.value = null;
        yearRef.current.value = null;
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form method="POST" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            style={{ margin: ".5rem" }}
            required
            ref={titleRef}
          />
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
          <input
            type="text"
            style={{ margin: ".5rem" }}
            required
            ref={yearRef}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default PostMovie;
