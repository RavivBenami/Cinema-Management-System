import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

function MemberDetailsComp(props) {
  const [user, setUser] = useState({});

  let members = useSelector((state) => state.members);

  useEffect(() => {
    let user = members.find((item) => item._id == props.match.params.id);
    setUser(user);
  }, []);
  return (
    <div>
      <div className="l-form">
        <div className="form">
          <h1 className="form-title">Details:</h1>
          Name : {user.name} <br />
          Email : {user.email} <br />
          City : {user.city} <br />
        </div>
      </div>
    </div>
  );
}

export default MemberDetailsComp;
