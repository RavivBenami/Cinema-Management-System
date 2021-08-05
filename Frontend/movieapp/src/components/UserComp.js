import React from "react";
import "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from 'axios'

function UserComp(props) {
  
  const editPage = () => {
    window.sessionStorage.setItem("id",props.user.id)
    props.history.push("/main/userManagement/editUser");
  };

  let token = window.localStorage.getItem("token")

  const deleteUser = () => {
       
    axios.delete(`http://localhost:8080/fullUser/${props.user.id}`,{headers:{authorization:`Bearer ${token}`}})
    window.location.reload()

  };

  return (
    <center>
    <div style={{width:"1000px"}}>
      <div className="container1">
      Full Name: {`${props.user.firstname} ${props.user.lastname}`}
      <br />
      Username : {props.user.username}
      <br />
      Session Time Out (Minutes): {props.user.sessionTimeOut}
      <br />
      Created Date : {props.user.createdDate}
      <br />
      Permissions : {props.user.permissions.join(" , ")}
      <br />
      <input type="button" value="Edit" className="btn btn-class" onClick={editPage} />
      <input type="button" value="Delete" className="btn btn-class" onClick={deleteUser} />
      </div>
    </div>
    </center>
  );
}

export default withRouter(UserComp);
