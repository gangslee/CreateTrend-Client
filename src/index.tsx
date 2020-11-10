import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./Components/App";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// index.html의 id가 'root'인 element에 프로젝트 렌더링 실시
