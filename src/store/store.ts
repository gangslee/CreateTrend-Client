import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authSlice } from "./reducers/auth";
import { homeSlice } from "./reducers/home";
import { keywordSlice } from "./reducers/keyword";
import { statisticsSlice } from "./reducers/statistics";
import { searchYoutuberSlice } from "./reducers/searchYoutuber";
import { periodSlice } from "./reducers/period";
import { starSlice } from "./reducers/star";
import { sliderSlice } from "./reducers/slider";
import { headerSlice } from "./reducers/header";
import { predictSlice } from "./reducers/predict";
import { videoDetailSlice } from "./reducers/videoDetail";

const cReducer = combineReducers({
  home: homeSlice.reducer,
  keyword: keywordSlice.reducer,
  statistics: statisticsSlice.reducer,
  searchYoutuber: searchYoutuberSlice.reducer,
  star: starSlice.reducer,
  period: periodSlice.reducer,
  slider: sliderSlice.reducer,
  header: headerSlice.reducer,
  auth: authSlice.reducer,
  predict: predictSlice.reducer,
  videoDetail: videoDetailSlice.reducer,
}); // 프로젝트의 모든 reducer를 combineReducers를 통해 결합하여 하나의 통합 reducer를 생성

const store = configureStore({
  reducer: cReducer,
});

export default store;
// 프로젝트의 통합 store를 생성 후 export

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
// 통합 state, dispatch를 타입 화 시킨 후 export
