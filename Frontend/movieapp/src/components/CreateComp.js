import React, { useState } from "react";
import axios from "axios";

function CreateComp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let token = window.localStorage.getItem("token")

  const createFunc = async () => {
    let resp = await axios.get(`http://localhost:8080/dbUser`,{headers:{authorization:`Bearer ${token}`}});
    let usersArr = resp.data;

    let counter = 0;

    usersArr.forEach(async (user) => {
      if (user.username == username) {
        counter++;
        if(user.password == undefined){
        let userObj = {
          username: username,
          password: password,
        };
        await axios.put(`http://localhost:8080/dbUser/${user._id}`, userObj,{headers:{authorization:`Bearer ${token}`}});
        props.history.push("/");
      }
      else{
        alert("you already have a password")
      }
      }
    });
    if (counter == 0) {
      alert("There is no username in the system , please talk to the manager");
    }
  };

  return (
    <div>
      <div className="l-form">
        <div className="form">
          <h1 className="form-title">Create new user</h1>
          <br />
          <label>Username:</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} autoFocus={true} className="form-control" /> <br />
          <label>Password:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control"/> <br />
          <input type="button" value="Create" onClick={createFunc} className="btn btn-class" />
          <input type="button" value="Cancel" onClick={() => props.history.push("/")} className="btn btn-class" />
        </div>
      </div>
    </div>
  );
}

export default CreateComp;
