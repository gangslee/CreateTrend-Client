import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Home from '../Routes/Home';
import Keyword from '../Routes/Keyword';
import Statistics from '../Routes/Statistics';
import Star from '../Routes/Star';

export default () => (
  <Router>
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/keyword/:search" component={Keyword} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/star" component={Star} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
