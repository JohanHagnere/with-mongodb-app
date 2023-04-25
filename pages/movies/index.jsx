import React from "react";
import FindMovieById from "../../app/components/FindMovieById";
import PostMovie from "../../app/components/PostMovie";
import DeleteMovie from "../../app/components/DeleteMovie";
import Navbar from "../../app/components/Navbar";

const index = () => {
  return (
    <>
      <Navbar />
      <h2>Find Movie by id</h2>
      <FindMovieById />
      <h2>Add a movie to the database</h2>
      <PostMovie />
      <h2>Delete a movie from the database</h2>
      <DeleteMovie />
    </>
  );
};

export default index;
