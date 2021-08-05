import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserComp from "./UserComp";
import { withRouter } from "react-router-dom";

function AllUsersComp(props) {
  let users = useSelector((state) => state.users);

  useEffect(() => {
    if (props.match.params.reload == 1) {
      props.history.push("/main/userManagement/allUsers/0");
      window.location.reload();
    }
  }, [props.match.params.reload]);

  let obj = users.map((user, key) => {
    return <UserComp user={user} key={key} />;
  });

  return (
    <div>
      <br />
      {obj}
    </div>
  );
}

export default withRouter(AllUsersComp);
