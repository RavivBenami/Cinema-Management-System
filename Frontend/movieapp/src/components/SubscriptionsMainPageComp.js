import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import AddMemberComp from "./AddMemberComp";
import AllMembersComp from "./AllMembersComp";
import EditMemberComp from "./EditMemberComp";
import MemberDetailsComp from "./MemberDetailsComp";

function SubscriptionsMainPageComp(props) {
  let visibility = "none";

  let users = useSelector((state) => state.users);

  let id = window.localStorage.getItem("userId")
  if (id == "60c5a56c54169a690d5a0257") {
    visibility = "visible";
  } else {
    if(users.length !== 0){
    let user = users.find((item) => item.id == id);
    user.permissions.forEach((permission) => {
      if (permission == "create subscriptions") {
        visibility = "visible";
      }
    });
   }
  }

  const allMembersClicked = () => {
    props.history.push("/main/subscriptions/allMembers");
  };

  const addMembersClicked = () => {
    props.history.push("/main/subscriptions/addMember");
  };
  return (
    <div>
      <br/>
      <input type="button" value="all members" style={{marginRight:"10px"}} className="btn btn-dark" onClick={allMembersClicked} />
      <input type="button" value="add member" className="btn btn-dark" onClick={addMembersClicked} style={{ display: visibility }} />
      <br/><br/>

      <Switch>
        <Route path="/main/subscriptions/allMembers" component={AllMembersComp} />
        <Route path="/main/subscriptions/addMember" component={AddMemberComp} />
        <Route path="/main/subscriptions/edit/:id" component={EditMemberComp} />
        <Route path="/main/subscriptions/showMember/:id" component={MemberDetailsComp} />
      </Switch>
    </div>
  );
}

export default SubscriptionsMainPageComp;
