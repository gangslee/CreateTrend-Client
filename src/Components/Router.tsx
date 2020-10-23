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
import Predict from "../Routes/Predict";
import VideoDetail from "../Routes/VideoDetail";
import Header from "./Container/Header";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Statistics} />
        <Route path="/search" component={Home} />
        <Route path="/keyword/:search" component={Keyword} />
        <Route
          path="/searchyoutuber/:youtuber_name"
          component={SearchYoutuber}
        />
        <Route path="/star/:id" component={Star} />
        <Route path='/predict' component={Predict}/>
        <Route path='/detail/:idx' component={VideoDetail}/>
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
