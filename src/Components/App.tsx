import React, {useLayoutEffect} from 'react';
import ReactPixel from 'react-facebook-pixel';

import Router from './Router';
import GlobalStyles from './GlobalStyles';
import store from '../store/store';
import {loadUser} from '../actions/auth';

const options = {
  autoConfig: true, // set pixel's autoConfig
  debug: false, // enable logs
};

function App() {
  useLayoutEffect(() => {
    loadUser(store.getState(), store.dispatch);
    ReactPixel.init('2474669376160852', null, options);
    ReactPixel.track('PageView', null);

    // if (window.screen.width < 1220) {
    //   const body = document.getElementsByTagName('body')[0];
    //   body.style.transform = `scale(${window.screen.width / 1220})`;
    //   body.style.transformOrigin = `top left`;
    //   body.style.marginTop = '80px';
    // }
  });
  return (
    <>
      <Router />
      <GlobalStyles />
    </>
  );
}

export default App;
