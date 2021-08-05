import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import WatchedMoviesComp from "./WatchedMoviesComp";

function MemberComp(props) {

  let subscriptions = useSelector(state=>state.subscriptions)
  let users = useSelector(state=>state.users)

  let token = window.localStorage.getItem("token")

  let visibilityEdit = "none"
  let visibilityDelete = "none"

  let user = users.find(item=>item.id == window.localStorage.getItem("userId"))

  if(window.localStorage.getItem("userId")=="60c5a56c54169a690d5a0257") {
    visibilityDelete = "visible"
    visibilityEdit = "visible"
  }
  else{
    if(user!==""){
      user.permissions.forEach(permission =>{
        if(permission == "edit subscriptions"){
          visibilityEdit = "visible"
        }
        if(permission == "delete subscriptions"){
          visibilityDelete = "visible"
        }
      })
    }
  }
 

  const editMember = () => {
    props.history.push(`/main/subscriptions/edit/${props.member._id}`);
  };

  const deleteMember = async () => {
    let sub = subscriptions.filter((item) => item.memberId == props.member._id);
    if (sub.length > 0) {
      await axios.delete(`http://localhost:8080/subscriptions/subscriptions/${sub[0]._id}`,{headers:{authorization:`Bearer ${token}`}});
      await axios.delete(`http://localhost:8080/subscriptions/members/${props.member._id}`,{headers:{authorization:`Bearer ${token}`}});

      window.location.reload();
    }
    else{

        await axios.delete(`http://localhost:8080/subscriptions/members/${props.member._id}`,{headers:{authorization:`Bearer ${token}`}});

        window.location.reload();
    }
  };

  return (
    <div>
      <div className="container1">
      <h3>{props.member.name}</h3>
      Email : {props.member.email}
      <br />
      City : {props.member.city}
      <br />
      <input type="button" value="Edit" className="btn btn-class" onClick={editMember} style = {{display:visibilityEdit}} />
      <input type="button" value="Delete" className="btn btn-class" onClick={deleteMember} style = {{display:visibilityDelete}}/><br/>
      <WatchedMoviesComp userId={props.member._id}/>
      </div>
    </div>
  );
}

export default withRouter(MemberComp);
