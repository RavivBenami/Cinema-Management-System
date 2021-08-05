import React from "react";
import LoginComp from "./LoginComp";
import { Switch, Route, Link } from "react-router-dom";
import CreateComp from "./CreateComp";
import MainComp from "./MainComp";

function HostComp() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={LoginComp} />
        <Route path="/create" component={CreateComp}/>
        <Route path="/main" component={MainComp}/>
      </Switch>
    </div>
  );
}

export default HostComp;
