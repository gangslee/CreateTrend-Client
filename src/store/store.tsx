import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";

import { authSlice } from "./reducers/auth";
import { homeSlice } from "./reducers/home";
import { keywordSlice } from "./reducers/keyword";
import { statisticsSlice } from "./reducers/statistics";
import { searchYoutuberSlice } from "./reducers/searchYoutuber";
import { periodSlice } from "./reducers/period";
import { starSlice } from "./reducers/star";
import { sliderSlice } from "./reducers/slider";

export interface IWordMapData {
  name: string;
  children: {
    name: string;
    value: number;
    color?: string;
  }[];
  color?: string;
}

export interface ILineChartData {
  type: string;
  data: {
    date: string;
    value: number;
  }[];
}

export interface IPieChartData {
  country: string;
  litres: number;
}

export interface IKeywordChartData {
  keyword: {
    name: string;
    value: number;
    popular?: number;
    wordmap?: IWordMapData;
    line?: ILineChartData[];
    video?: IVideoListData[];
    visit?: boolean;
  }[];
  type?: string;
  current?: number;
}

export interface IVideoListData {
  type: string;
  data: {
    video_id: string;
    video_name: string;
    thumbnail_url: string;
    videokeywordnew?: {
      keyword: string;
    }[];
  }[];
  current?: number;
}

const headerSlice = createSlice({
  name: "headerReducer",
  initialState: {
    isOpenSignIn: false,
    isOpenSignUp: false,
    isOpenUserMenu: false,
    isMembership: true,
  },
  reducers: {
    setIsOpenSignIn: (state, action) => {
      state.isOpenSignIn = action.payload;
      state.isOpenSignUp = false;
    },
    setIsOpenSignUp: (state, action) => {
      state.isOpenSignUp = action.payload;
      state.isOpenSignIn = false;
    },

    setIsOpenUserMenu: (state, action) => {
      state.isOpenUserMenu = action.payload;
    },
  },
});

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
});

const store = configureStore({
  reducer: cReducer,
});

export const {
  setIsOpenSignIn,
  setIsOpenSignUp,
  setIsOpenUserMenu,
} = headerSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
