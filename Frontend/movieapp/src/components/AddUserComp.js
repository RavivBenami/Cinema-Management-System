import React, { useEffect, useState } from "react";
import axios from "axios";

function AddUserComp(props) {
  const [user, setUser] = useState({ firstname: "", lastname: "", username: "", createdDate: "", sessionTimeOut: "", permissions: [] });
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const addUser = async () => {

    let token = window.localStorage.getItem("token")
    if(user.firstname.length == 0 || user.lastname.length == 0 || user.username.length == 0 || user.sessionTimeOut.length == 0 ){
      alert("please fill all the fields")
    }
    else{
    let counter = 0;

    var today = new Date();
    var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

    let userWithDate = { ...user, createdDate: date };

    let resp = await axios.get("http://localhost:8080/dbUser",{headers:{authorization:`Bearer ${token}`}});
    let data = resp.data;

    data.forEach((item) => {
      if (user.username == item.username) {
        counter++;
      }
    });
    if (counter > 0) {
      alert("username is taken");
    } else {
      await axios.post("http://localhost:8080/fullUser", userWithDate,{headers:{authorization:`Bearer ${token}`}});
      props.history.push("/main/userManagement/allUsers/1");
    }
  }
  };
  useEffect(() => {
    checkChecked();
  }, [user]);

  const checkChecked = () => {
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
      setChecked2(true);
      let permissionsArr = user.permissions;

      if (permissionsArr.includes("view movies") == false) {
        permissionsArr.push("view movies");
        setUser({ ...user, permissions: permissionsArr });
      }
    } else {
      setChecked2(false);
      let permissionsArr = user.permissions;

      if (permissionsArr.includes("view movies") == true) {
        let updatedArr = permissionsArr.filter((item) => item !== "view movies");
        setUser({ ...user, permissions: updatedArr });
      }
    }
  };

  const viewSubscription = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      permissionsArr.push("view subscriptions");
      setUser({ ...user, permissions: permissionsArr });
    } else {
      let updatedArr = permissionsArr.filter((item) => item !== "view subscriptions");
      console.log(updatedArr);
      setUser({ ...user, permissions: updatedArr });
    }
  };

  const createSubscription = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      permissionsArr.push("create subscriptions");
      setUser({ ...user, permissions: permissionsArr });
    } else {
      let updatedArr = permissionsArr.filter((item) => item !== "create subscriptions");
      setUser({ ...user, permissions: updatedArr });
    }
  };
  const deleteSubscription = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      permissionsArr.push("delete subscriptions");
      setUser({ ...user, permissions: permissionsArr });
    } else {
      let updatedArr = permissionsArr.filter((item) => item !== "delete subscriptions");
      setUser({ ...user, permissions: updatedArr });
    }
  };
  const updateSubscription = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      permissionsArr.push("update subscriptions");
      setUser({ ...user, permissions: permissionsArr });
    } else {
      let updatedArr = permissionsArr.filter((item) => item !== "update subscriptions");
      setUser({ ...user, permissions: updatedArr });
    }
  };
  const viewMovies = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      permissionsArr.push("view movies");
      setUser({ ...user, permissions: permissionsArr });
    } else {
      let updatedArr = permissionsArr.filter((item) => item !== "view movies");
      setUser({ ...user, permissions: updatedArr });
    }
  };
  const createMovies = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      permissionsArr.push("create movies");
      setUser({ ...user, permissions: permissionsArr });
    } else {
      let updatedArr = permissionsArr.filter((item) => item !== "create movies");
      setUser({ ...user, permissions: updatedArr });
    }
  };
  const deleteMovies = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      permissionsArr.push("delete movies");
      setUser({ ...user, permissions: permissionsArr });
    } else {
      let updatedArr = permissionsArr.filter((item) => item !== "delete movies");
      setUser({ ...user, permissions: updatedArr });
    }
  };
  const updateMovies = (e) => {
    let permissionsArr = user.permissions;

    if (e.target.checked) {
      permissionsArr.push("update movies");
      setUser({ ...user, permissions: permissionsArr });
    } else {
      let updatedArr = permissionsArr.filter((item) => item !== "update movies");
      setUser({ ...user, permissions: updatedArr });
    }
  };

  const cancel = () => {
    props.history.push("/main/userManagement/allUsers/0");
  };

  return (
    <center>
    <div style={{width:"500px",height:"500px"}}>
      <div className="container1">
      <h3>Add new User</h3>
      <br />
      First Name : <input type="text" className="form-control" onChange={(e) => setUser({ ...user, firstname: e.target.value })} />
      <br />
      Last Name : <input type="text" className="form-control" onChange={(e) => setUser({ ...user, lastname: e.target.value })} />
      <br />
      User Name : <input type="text" className="form-control" onChange={(e) => setUser({ ...user, username: e.target.value })} />
      <br />
      Session Time Out (Minutes) : <input type="text" className="form-control" onChange={(e) => setUser({ ...user, sessionTimeOut: e.target.value })} />
      <br />
      Permission : <br />
      View Subscriptions: <input type="checkbox" onChange={viewSubscription} checked={checked1} />
      <br />
      Create Subscriptions: <input type="checkbox" onChange={createSubscription} />
      <br />
      Delete Subscriptions: <input type="checkbox" onChange={deleteSubscription} />
      <br />
      Update Subscription: <input type="checkbox" onChange={updateSubscription} />
      <br />
      View Movies: <input type="checkbox" onChange={viewMovies} checked={checked2} />
      <br />
      Create Movies: <input type="checkbox" onChange={createMovies} />
      <br />
      Delete Movies: <input type="checkbox" onChange={deleteMovies} />
      <br />
      Update Movie: <input type="checkbox" onChange={updateMovies} />
      <br />
      <input type="button" value="Add" className="btn btn-class" style={{marginTop:"10px"}} onClick={addUser} />
      <input type="button" value="cancel" className="btn btn-class" style={{marginTop:"10px"}} onClick={cancel} />
      </div>
    </div>
    </center>
  );
}

export default AddUserComp;
