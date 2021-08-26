import React, { useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import axios from "axios";

function LoginComp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginFunc = async () => {
    let user = {
      username: username,
      password: password,
    };

    let login = await axios.post(`http://localhost:8080/dbUser/login`, user);
    console.log(login);
    if (login.data == "no user in sys") {
      alert("wrong username try again");
    }
    else if (login.data.data.slice(0, 7) == "success") {
      console.log(login.data);
      let id = login.data.data.slice(8);
      window.localStorage.setItem("token",login.data.token)
      window.localStorage.setItem("username", username);
      window.localStorage.setItem("userId", id);
      props.history.push("/main");
    }
    else if(login.data == "fail"){
      alert("wrong password")
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row content">
          <div className="col-md-6 mb-3">
            <img src="https://mag-cinema.com/image/catalog/News/2020/mammut1.jpg" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h3 className="signin-text mb3">Sign in</h3>
            <br />
            <input type="text" onChange={(e) => setUsername(e.target.value)} autoFocus={true} placeholder="username" className="form-control" />
            <br />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" className="form-control" />
            <br />
            <input type="button" value="Login" onClick={loginFunc} className="btn btn-class" />
            <br />
            <br />
            <Link to="/create" className="link">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComp;
