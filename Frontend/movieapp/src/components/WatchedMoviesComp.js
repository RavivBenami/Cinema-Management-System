import React, { useEffect, useState } from "react";
import AddWatchedMovie from "./AddWatchedMovie";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function WatchedMoviesComp(props) {
  const [showing, setShowing] = useState(false);

  let subscriptions = useSelector(state=>state.subscriptions)
  let stateMovies = useSelector(state=>state.movies)


  let movies = [];
  let subForMember = subscriptions.filter((item) => item.memberId == props.userId);
  if (subForMember.length > 0) {
    movies = subForMember[0].movies.map((subMovies) => {
      let correctMovie = {};
      stateMovies.forEach((movie) => {
        if (subMovies.movieId == movie._id) {
          correctMovie = { name: movie.name, id: movie._id, date: subMovies.date };
        }
      });
      return correctMovie;
    });
  }
  let obj = movies.map((item, key) => {
    return (
      <li key={key}>
        <Link to={`/main/movies/${item.id}`}>{item.name}</Link>,{item.date}
      </li>
    );
  });
  return (
    <div>
      <h5>Movies Watched</h5>
      <input type="button" value="subscribe to new movie" style={{marginBottom:"10px"}} className='btn btn-class' onClick={() => setShowing(!showing)} />
      <div style={{ display: showing ? "block" : "none" }}>
        <AddWatchedMovie moviesWatched={movies} memberId={props.userId} sub={subForMember} />
      </div>
      {obj}
    </div>
  );
}

export default WatchedMoviesComp;
