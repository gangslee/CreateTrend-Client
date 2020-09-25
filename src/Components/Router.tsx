import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "../Routes/Home";
import Keyword from "../Routes/Keyword";
import Statistics from "../Routes/Statistics";
import SearchYoutuber from "../Routes/SearchYoutuber";
import Star from "../Routes/Star";
import Header from "./Container/Header";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/keyword/:search" component={Keyword} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/searchyoutuber/:id" component={SearchYoutuber} />
        <Route path="/star/:id" component={Star} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
