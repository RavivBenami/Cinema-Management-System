import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";

function EditUserComp(props) {
  const [user, setUser] = useState({ permissions: [] });
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);

  let token = window.localStorage.getItem("token")

  

  useEffect(async () => {
    let id = window.sessionStorage.getItem("id");
    let userResp = await axios.get(`http://localhost:8080/fullUser/${id}`,{headers:{authorization:`Bearer ${token}`}});
    let user = userResp.data;

    user.permissions.forEach((permission) => {
      if (permission == "view subscriptions") {
        setChecked1(true);
      }
      if (permission == "create subscriptions") {
        setChecked2(true);
      }
      if (permission == "delete subscriptions") {
        setChecked3(true);
      }
      if (permission == "update subscriptions") {
        setChecked4(true);
      }
      if (permission == "view movies") {
        setChecked5(true);
      }
      if (permission == "create movies") {
        setChecked6(true);
      }
      if (permission == "delete movies") {
        setChecked7(true);
      }
      if (permission == "update movies") {
        setChecked8(true);
      }
    });
    setUser(user);
  }, []);

  const setViewChecked = () => {
    let counter1 = 0;
    let counter2 = 0;
    user.permissions.forEach((permission) => {
      if (permission == "create subscriptions" || permission === "delete subscriptions" || permission === "update subscriptions") {
        counter1++;
      }
      if (permission == "create movies" || permission === "delete movies" || permission === "update movies") {
        counter2++;
      }
      if (permission == "view subscriptions") {
        counter1++;
      }
      if (permission == "view movies") {
        counter2++;
      }
    });
    if (counter1 > 0) {
      setChecked1(true);
      let permissionsArr = user.permissions;

      if (permissionsArr.includes("view subscriptions") == false) {
        permissionsArr.push("view subscriptions");
        setUser({ ...user, permissions: permissionsArr });
      }
    } else {
      setChecked1(false);
      let permissionsArr = user.permissions;

      if (permissionsArr.includes("view subscriptions") == true) {
        let updatedArr = permissionsArr.filter((item) => item !== "view subscriptions");
        setUser({ ...user, permissions: updatedArr });
      }
    }
    if (counter2 > 0) {
      setChecked5(true);
      let permissionsArr = user.permissions;

      if (permissionsArr.includes("view movies") == false) {
        permissionsArr.push("view movies");
        setUser({ ...user, permissions: permissionsArr });
      }
    } else {
      setChecked5(false);
      let permissionsArr = user.permissions;

      if (permissionsArr.includes("view movies") == true) {
        let updatedArr = permissionsArr.filter((item) => item !== "view movies");
        setUser({ ...user, permissions: updatedArr });
      }
    }
  };

  useEffect(() => {
    setViewChecked();
  }, [user]);

  const updateUser = async () => {
    await axios.put(`http://localhost:8080/fullUser/${user.id}`, user,{headers:{authorization:`Bearer ${token}`}});
    props.history.push("/main/userManagement/allUsers/1");
  };

  const viewSubscription = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      if (permissionsArr.includes("view subscriptions") == false) {
        permissionsArr.push("view subscriptions");
        setUser({ ...user, permissions: permissionsArr });
      }
    } else {
      if (permissionsArr.includes("view subscriptions") == true) {
        let updatedArr = permissionsArr.filter((item) => item !== "view subscriptions");
        setUser({ ...user, permissions: updatedArr });
      }
    }
  };

  const createSubscription = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      if (permissionsArr.includes("create subscriptions") == false) {
        setChecked2(true);
        permissionsArr.push("create subscriptions");
        setUser({ ...user, permissions: permissionsArr });
      }
    } else {
      if (permissionsArr.includes("create subscriptions") == true) {
        setChecked2(false);
        let updatedArr = permissionsArr.filter((item) => item !== "create subscriptions");
        setUser({ ...user, permissions: updatedArr });
      }
    }
  };
  const deleteSubscription = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      if (permissionsArr.includes("delete subscriptions") == false) {
        setChecked3(true);
        permissionsArr.push("delete subscriptions");
        setUser({ ...user, permissions: permissionsArr });
      }
    } else {
      if (permissionsArr.includes("delete subscriptions") == true) {
        setChecked3(false);
        let updatedArr = permissionsArr.filter((item) => item !== "delete subscriptions");
        setUser({ ...user, permissions: updatedArr });
      }
    }
  };
  const updateSubscription = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      if (permissionsArr.includes("update subscriptions") == false) {
        setChecked4(true);
        permissionsArr.push("update subscriptions");
        setUser({ ...user, permissions: permissionsArr });
      }
    } else {
      if (permissionsArr.includes("update subscriptions") == true) {
        setChecked4(false);
        let updatedArr = permissionsArr.filter((item) => item !== "update subscriptions");
        setUser({ ...user, permissions: updatedArr });
      }
    }
  };
  const viewMovies = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      if (permissionsArr.includes("view movies") == false) {
        permissionsArr.push("view movies");
        setUser({ ...user, permissions: permissionsArr });
      }
    } else {
      if (permissionsArr.includes("view movies") == true) {
        setChecked5(false);
        let updatedArr = permissionsArr.filter((item) => item !== "view movies");
        setUser({ ...user, permissions: updatedArr });
      }
    }
  };
  const createMovies = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      if (permissionsArr.includes("create movies") == false) {
        setChecked6(true);
        permissionsArr.push("create movies");
        setUser({ ...user, permissions: permissionsArr });
      }
    } else {
      if (permissionsArr.includes("create movies") == true) {
        setChecked6(false);
        let updatedArr = permissionsArr.filter((item) => item !== "create movies");
        setUser({ ...user, permissions: updatedArr });
      }
    }
  };
  const deleteMovies = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      if (permissionsArr.includes("delete movies") == false) {
        setChecked7(true);
        permissionsArr.push("delete movies");
        setUser({ ...user, permissions: permissionsArr });
      }
    } else {
      if (permissionsArr.includes("delete movies") == true) {
        setChecked7(false);
        let updatedArr = permissionsArr.filter((item) => item !== "delete movies");
        setUser({ ...user, permissions: updatedArr });
      }
    }
  };
  const updateMovies = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      if (permissionsArr.includes("update movies") == false) {
        setChecked8(true);
        permissionsArr.push("update movies");
        setUser({ ...user, permissions: permissionsArr });
      }
    } else {
      if (permissionsArr.includes("update movies") == true) {
        setChecked8(false);
        let updatedArr = permissionsArr.filter((item) => item !== "update movies");
        setUser({ ...user, permissions: updatedArr });
      }
    }
  };
  const goBack = () => {
    props.history.push("/main/userManagement/allUsers/0");
  };

  return (
    <center>
    <div style={{width:"500px"}}>
      <div className="container1">
      First Name : <input type="text" value={user.firstname} className="form-control" onChange={(e) => setUser({ ...user, firstname: e.target.value })} />
      <br />
      Last Name : <input type="text" value={user.lastname} className="form-control" onChange={(e) => setUser({ ...user, lastname: e.target.value })} />
      <br />
      User Name : <input type="text" value={user.username} className="form-control" onChange={(e) => setUser({ ...user, username: e.target.value })} />
      <br />
      Session Time Out (Minutes) : <input type="text" value={user.sessionTimeOut} className="form-control" onChange={(e) => setUser({ ...user, sessionTimeOut: e.target.value })} />
      <br />
      Created Date: {user.createdDate}
      <br />
      Permission : <br />
      View Subscriptions: <input type="checkbox" onChange={viewSubscription} checked={checked1} />
      <br />
      Create Subscriptions: <input type="checkbox" onChange={createSubscription} checked={checked2} />
      <br />
      Delete Subscriptions: <input type="checkbox" onChange={deleteSubscription} checked={checked3} />
      <br />
      Update Subscription: <input type="checkbox" onChange={updateSubscription} checked={checked4} />
      <br />
      View Movies: <input type="checkbox" onChange={viewMovies} checked={checked5} />
      <br />
      Create Movies: <input type="checkbox" onChange={createMovies} checked={checked6} />
      <br />
      Delete Movies: <input type="checkbox" onChange={deleteMovies} checked={checked7} />
      <br />
      Update Movie: <input type="checkbox" onChange={updateMovies} checked={checked8} />
      <br />
      <input type="button" value="Update" className="btn btn-class" onClick={updateUser} />
      <input type="button" value="Cancel" className="btn btn-class" onClick={goBack}/>
      </div>
    </div>
    </center>
  );
}

export default withRouter(EditUserComp);
