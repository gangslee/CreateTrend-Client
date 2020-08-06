import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "../Routes/Home";
import Keyword from "../Routes/Keyword";
import Channel from "../Routes/Channel";
import Star from "../Routes/Star";

export default () => (
  <Router>
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/keyword" exact component={Keyword} />
        <Route path="/channel" component={Channel} />
        <Route path="/star" component={Star} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
