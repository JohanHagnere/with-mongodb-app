import React, { useRef } from "react";

function DeleteMovie() {
  const idRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = idRef.current.value;

    fetch(`/api/movie/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Movie deleted.`);
        idRef.current.value = null;
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Id:
          <input type="text" style={{ margin: ".5rem" }} required ref={idRef} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default DeleteMovie;
