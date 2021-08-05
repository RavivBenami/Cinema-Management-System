import React, { useEffect, useState } from "react";
import { Switch, Link, Route } from "react-router-dom";
import AddMovieComp from "./AddMovieComp";
import AllMoviesComp from "./AllMoviesComp";
import EditMovieComp from "./EditMovieComp";
import { useSelector } from "react-redux";
import SingleMovieComp from "./SingleMovieComp";

function MoviesComp(props) {
  let counter = 0;
  let visibility = "none";

  let users = useSelector((state) => state.users);

  if (window.localStorage.getItem("userId") == "60c5a56c54169a690d5a0257") {
    visibility = "visible";
  } else {
    users.map((user) => {
      if (user.id == window.localStorage.getItem("userId")) {
        user.permissions.forEach((permission) => {
          if (permission == "create movies") {
            visibility = "visible";
          }
        });
      }
    });
  }

  const allMovies = () => {
    props.history.push("/main/movies/allMovies/0");
  };
  const addMovie = () => {
    props.history.push("/main/movies/add");
  };

  return (
    <div>
      <br />
      <input type="button" value="all movies" onClick={allMovies} className="btn btn-dark"/>
      <input type="button" value="add movie" onClick={addMovie} style={{ display: visibility , marginLeft: "8px"}} className="btn btn-dark"/>

      <br />

      <Switch>
        <Route path="/main/movies/allMovies/:reload" component={AllMoviesComp} />
        <Route path="/main/movies/add" component={AddMovieComp} />
        <Route path="/main/movies/edit/:id" component={EditMovieComp} />
        <Route path="/main/movies/:id" component={SingleMovieComp} />
      </Switch>
    </div>
  );
}

export default MoviesComp;
