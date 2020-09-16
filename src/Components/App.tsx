import React, {useLayoutEffect} from 'react';
import Router from './Router';
import GlobalStyles from './GlobalStyles';

import store from '../store/store';
import {loadUser} from '../actions/auth';

function App() {
  useLayoutEffect(() => {
    loadUser(store.getState(), store.dispatch);
  });
  return (
    <>
      <Router />
      <GlobalStyles />
    </>
  );
}

export default App;
