import React, { useEffect, useState } from "react";
import axios from "axios";
import SubscriptionComp from "./SubscriptionComp";

function SingleMovieComp(props) {
  const [movie, setMovie] = useState({name:'',premiered:'',genres:[],img:''});

  let token = window.localStorage.getItem("token")

  useEffect(async () => {
    let movieResp = await axios.get(`http://localhost:8080/subscriptions/movies/${props.match.params.id}`,{headers:{authorization:`Bearer ${token}`}});
    setMovie(movieResp.data);
  }, []);

  return (
    <center>
    <div>
      <div className="l-form">
        <div className="form">
      <h1 className="form-title">
        {movie.name},{movie.premiered.slice(0, 4)}
      </h1>
      Genres: {movie.genres.join(' , ')}
      <br />
      <img src={movie.image} style={{marginBottom:"8px"}}></img> <SubscriptionComp movieId={movie._id} /> <br />
      </div>
      </div>
    </div>
    </center>
  );
}

export default SingleMovieComp;
