import React, { useLayoutEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';

import Router from './Router';
import GlobalStyles from './GlobalStyles';
import store from '../store/store';
import { loadUser } from '../actions/auth';

const options = {
  autoConfig: true,
  debug: false,
}; // react-facebook-pixel option 설정

function App() {
  useLayoutEffect(() => {
    // Component 생성 시 (앱 실행 시) 브라우저의 localstorage에 auth token 존재 여부 확인
    loadUser(store.getState(), store.dispatch);

    // react-facebook-pixel 라이브러리를 통해 사용자 tracking 실시
    ReactPixel.init('842225599925369', null, options);
    ReactPixel.track('PageView', null);
  });

  return (
    <>
      <Router />
      <GlobalStyles />
    </>
  );
}

export default App;
