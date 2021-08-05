import axios from "axios";
import React, { useState } from "react";

function AddMemberComp(props) {
  const [member, setMember] = useState({ name: "", email: "", city: "" });

  const addMember = async () => {
    if (member.name == "" || member.email == "" || member.city == "") {
      alert("please fill all the fields");
    } else {
      let token = window.localStorage.getItem("token");
      await axios.post("http://localhost:8080/subscriptions/members", member, { headers: { authorization: `Bearer ${token}` } });
      props.history.push("/main/subscriptions/allMembers");
    }
  };
  const goBack = () => {
    props.history.push("/main/subscriptions/allMembers");
  };

  return (
    <div>
      <div className="l-form">
        <div className="form">
            <h1 className="form-title">Add new Member</h1>
          Name:
          <input type="text" value={member.name} className="form-control" onChange={(e) => setMember({ ...member, name: e.target.value })} />
          <br />
          City:
          <input type="text" value={member.city} className="form-control" onChange={(e) => setMember({ ...member, city: e.target.value })} />
          <br />
          Email:
          <input type="text" value={member.email} className="form-control" onChange={(e) => setMember({ ...member, email: e.target.value })} />
          <br />
          <input type="button" value="Add" className="btn btn-class" onClick={addMember} />
          <input type="button" value="Cancel" className="btn btn-class" onClick={goBack} />
        </div>
      </div>
    </div>
  );
}

export default AddMemberComp;
