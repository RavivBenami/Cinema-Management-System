import React, { useEffect, useState } from "react";
import axios from "axios";
import WatchedMoviesComp from "./WatchedMoviesComp";

function EditMemberComp(props) {
  const [member, setMember] = useState({ name: "", email: "", city: "" });

  let token = window.localStorage.getItem("token");

  useEffect(async () => {
    let resp = await axios.get(`http://localhost:8080/subscriptions/members/${props.match.params.id}`, { headers: { authorization: `Bearer ${token}` } });
    let member = resp.data;

    setMember(member);
  }, []);

  const updateMember = async () => {
    await axios.put(`http://localhost:8080/subscriptions/members/${props.match.params.id}`, member, { headers: { authorization: `Bearer ${token}` } });
    props.history.push("/main/subscriptions/allMembers");
  };
  const goBack = () => {
    props.history.push("/main/subscriptions/allMembers");
  };
  return (
    <div>
      <div className="l-form">
        <div className="form">
          Name:
          <input type="text" value={member.name} class="form-control" onChange={(e) => setMember({ ...member, name: e.target.value })} />
          <br />
          City:
          <input type="text" value={member.city} class="form-control" onChange={(e) => setMember({ ...member, city: e.target.value })} />
          <br />
          Email:
          <input type="text" value={member.email} class="form-control" onChange={(e) => setMember({ ...member, email: e.target.value })} />
          <br />
          <input type="button" value="edit" className="btn btn-class" onClick={updateMember} />
          <input type="button" value="cancel" className="btn btn-class" onClick={goBack} />
        </div>
      </div>
    </div>
  );
}

export default EditMemberComp;
