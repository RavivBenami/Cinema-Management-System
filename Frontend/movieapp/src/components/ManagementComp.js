import React, { useEffect } from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import AllUsersComp from "./AllUsersComp";
import AddUserComp from "./AddUserComp";
import EditUserComp from './EditUserComp'

function ManagementComp(props) {

  const allUsers = () => {
    props.history.push("/main/userManagement/allUsers/0");
  };
  const addUser = () => {
    props.history.push("/main/userManagement/addUsers");
  };

  return (
    <div>
      <h3>Users</h3>
      <input type="button" value="all users" className="btn btn-dark" style={{marginRight:"10px" ,marginBottom:"10px"}} onClick={allUsers} />
      <input type="button" value="add user" className="btn btn-dark" style={{marginBottom:"10px"}}  onClick={addUser} />
      <br/>
      <Switch>
        <Route path="/main/userManagement/allUsers/:reload" exact component={AllUsersComp} />
        <Route path="/main/userManagement/addUsers" exact component={AddUserComp} />
        <Route path="/main/userManagement/editUser" exact component={EditUserComp} />
      </Switch>
    </div>
  );
}

export default withRouter(ManagementComp);
