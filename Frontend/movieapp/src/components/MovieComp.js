import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import SubscriptionComp from "./SubscriptionComp";

function MovieComp(props) {
  let visibilityEdit = "none";
  let visibilityDelete = "none";

  let token = window.localStorage.getItem("token")

  let users = useSelector((state) => state.users);
  let subs = useSelector((state) => state.subscriptions)

  if (window.localStorage.getItem("userId") === "60c5a56c54169a690d5a0257") {
    visibilityEdit = "visible";
    visibilityDelete = "visible";
  } else {
    users.map((user) => {
      if (user.id == window.localStorage.getItem("userId")) {
        user.permissions.forEach((permission) => {
          if (permission == "delete movies") {
            visibilityDelete = "visible";
          }
          if (permission == "update movies") {
            visibilityEdit = "visible";
          }
        });
      }
    });
  }

  const editMovie = () => {
    props.history.push(`/main/movies/edit/${props.movie._id}`);
  };

  const deleteMovie = async () => {
    
   let correctSub = subs.forEach(async(sub)=>{
     let index = sub.movies.findIndex(movie=>movie.movieId == props.movie._id)
     console.log(index);
      if(index != -1){
        let finishedSubs = sub 
        finishedSubs.movies.splice(index,1)
        if(finishedSubs.movies.length == 0){
          await axios.delete(`http://localhost:8080/subscriptions/subscriptions/${finishedSubs._id}`,{headers:{authorization:`Bearer ${token}`}})
        }
        else{
          console.log("hello");
          await axios.put(`http://localhost:8080/subscriptions/subscriptions/${finishedSubs._id}`,finishedSubs,{headers:{authorization:`Bearer ${token}`}})
        }
      }
    })

    await axios.delete(`http://localhost:8080/subscriptions/movies/${props.movie._id}`,{headers:{authorization:`Bearer ${token}`}});
    window.location.reload();

  };

  return (
    <center>
      <div style={{width:"450px"}}>
        <div className="container1">
        <div className="div-movie">
          <h3>
            {props.movie.name}, {props.movie.premiered.slice(0, 4)}
          </h3>
          Genres: {props.movie.genres.join(" , ")}
          <br />
          <img src={props.movie.image} style={{marginBottom:"8px",width:"210px",height:"295px"}} className="img-movie"/>
          <SubscriptionComp movieId={props.movie._id} /> <br />
          <input type="button" value="edit" onClick={editMovie} style={{ display: visibilityEdit }} className="btn btn-dark" />
          <input type="button" value="delete" onClick={deleteMovie} style={{ display: visibilityDelete,marginLeft:"7px" }} className="btn btn-dark" />
          </div>
        </div>
      </div>
    </center>
  );
}

export default withRouter(MovieComp);
