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
  predict:predictSlice.reducer,
});

const store = configureStore({
  reducer: cReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
