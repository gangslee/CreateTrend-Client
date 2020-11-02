import React, { useLayoutEffect } from "react";
import ReactPixel from "react-facebook-pixel";

import Router from "./Router";
import GlobalStyles from "./GlobalStyles";
import store from "../store/store";
import { loadUser } from "../actions/auth";

const options = {
  autoConfig: true, // set pixel's autoConfig
  debug: false, // enable logs
};

function App() {
  useLayoutEffect(() => {
    loadUser(store.getState(), store.dispatch);
    ReactPixel.init("842225599925369", null, options);
    ReactPixel.track("PageView", null);
  });
  return (
    <>
      <Router />
      <GlobalStyles />
    </>
  );
}

export default App;
