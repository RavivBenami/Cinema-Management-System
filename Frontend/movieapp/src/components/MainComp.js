import axios from "axios";
import React, { useEffect, useState } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import ManagementComp from "./ManagementComp";
import MoviesComp from "./MoviesComp";
import { useDispatch } from "react-redux";
import SubscriptionsMainPageComp from "./SubscriptionsMainPageComp";

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MovieIcon from '@material-ui/icons/Movie';
import GroupIcon from '@material-ui/icons/Group';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


function MainComp(props) {
  const [user, setUser] = useState("");

  let dispatch = useDispatch();

  let viewMovies = false;
  let viewSubs = false;
  
  let token = window.localStorage.getItem("token")

  useEffect(async () => {
    let userResp = await axios.get(`http://localhost:8080/fullUser/${window.localStorage.getItem("userId")}`,{headers:{authorization:`Bearer ${token}`}});
    setUser(userResp.data);
    let usersResp = await axios.get("http://localhost:8080/fullUser",{headers:{authorization:`Bearer ${token}`}});
    let users = usersResp.data;
    let movieResp = await axios.get("http://localhost:8080/subscriptions/movies",{headers:{authorization:`Bearer ${token}`}})
    let movies = movieResp.data;
    let subsResp = await axios.get("http://localhost:8080/subscriptions/subscriptions",{headers:{authorization:`Bearer ${token}`}});
    let subscriptions = subsResp.data;
    let membersResp = await axios.get(`http://localhost:8080/subscriptions/members`,{headers:{authorization:`Bearer ${token}`}});
    let members = membersResp.data;

    let action = {
      type: "ADD_DATA",
      payload: {
        users: users,
        movies: movies,
        subscriptions: subscriptions,
        members: members,
      },
    };
    dispatch(action);
  }, []);

  if (window.localStorage.getItem("userId") == "60c5a56c54169a690d5a0257") {
    viewMovies = true;
    viewSubs = true;
  }
  if (user !== "") {
    user.permissions.forEach((permission) => {
      if (permission == "view movies") {
        viewMovies = true;
      }
      if (permission == "view subscriptions") {
        viewSubs = true;
      }
    });
  }
  let timer;
  useEffect(() => {
    if (user !== "") {
      timer = setTimeout(() => {
        alert("your time has expired");
        props.history.push("/");
      }, user.sessionTimeOut * 100000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  let visibility = "none";

  const moviesClicked = () => {
    if (viewMovies) {
      props.history.push("/main/movies/allMovies/0");
    } else {
      alert("you dont have permission to watch movies");
    }
  };

  const subscriptionClicked = () => {
    if (viewSubs) {
      props.history.push("/main/subscriptions/allMembers");
    } else {
      alert("you dont have permission to view subscribers");
    }
  };
  const logoutClicked = () => {
    clearTimeout(timer);
    props.history.push("/");
  };
  const userManagementClicked = () => {
    props.history.push("/main/userManagement/allUsers/0");
  };

  if (window.localStorage.getItem("username") == "admin") {
    visibility = "visible";
  }

  const useStyles = makeStyles({
    root: {
      backgroundColor: "#1b1717",
    },
  });

  const classes = useStyles();

  return (
    <div>
      <BottomNavigation
        showLabels
        className={classes.root}>
        <BottomNavigationAction style={{color:"white"}} label="Movies" icon={<MovieIcon/>} onClick={moviesClicked} />
        <BottomNavigationAction style={{color:"white"}} label="Subscriptions" icon={<SubscriptionsIcon/>} onClick={subscriptionClicked}  />
        <BottomNavigationAction style={{color:"white", display:visibility}} label="user Management" icon={<GroupIcon/>} onClick={userManagementClicked} />
        <BottomNavigationAction style={{color:"white",float:"left"}} label="Logout" icon={<ExitToAppIcon/>} onClick={logoutClicked}/>
      </BottomNavigation>

      <Switch>
        <Route path="/main/userManagement" component={ManagementComp} />
        <Route path="/main/movies" component={MoviesComp} />
        <Route path="/main/subscriptions" component={SubscriptionsMainPageComp} />
      </Switch>
    </div>
  );
}

export default withRouter(MainComp);
