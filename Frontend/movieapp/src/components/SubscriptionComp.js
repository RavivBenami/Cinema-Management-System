import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SubscriptionComp(props) {

  let subscriptions = useSelector(state=>state.subscriptions)

  let filteredSubscriptions = subscriptions.filter((subscription) => {
    let correctSub;
    subscription.movies.forEach((movie) => {
      if (movie.movieId == props.movieId) {
        correctSub = subscription;
      }
    });
    return correctSub;
  });
    
  let members = useSelector(state=>state.members)
  let obj = filteredSubscriptions.map((sub,key) => {
    let member = members.filter(member => member._id == sub.memberId);
    let index = sub.movies.findIndex((movie) => movie.movieId == props.movieId);
    if(member.length != 0){
    return (
      <li key={key}>
        <Link to={`/main/subscriptions/showMember/${member[0]._id}`}>{member[0].name}</Link> , {sub.movies[index].date}
      </li>
    )
    }
  });
  if(obj.length == 0){
    obj = <label>None</label>
  }

  return (
    <div style={{ width: "300px" }}>
      Subscribers watched:
      <br />
      {obj}
    </div>
  );
}

export default SubscriptionComp;
