import {configureStore, createSlice, combineReducers} from '@reduxjs/toolkit';

import {authSlice} from './reducers/auth';
import {homeSlice} from './reducers/home';
import {keywordSlice} from './reducers/keyword';
import {statisticsSlice} from './reducers/statistics';
import {searchYoutuberSlice} from './reducers/searchYoutuber';

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

export interface IStarState {
  channelInfo?: {
    idx: number;
    thumbnail_url: string;
    channel_description: string;
    channel_name: string;
    channel_start_date: string;
    subscriber: number;
  };
  keyword: {
    pie: {
      name: string;
      value: number;
      wordmap: IWordMapData;
    }[];
    current: 0;
  };
  line?: ILineChartData[];
  video: IVideoListData[];
  isLoading?: boolean;
  start?: string;
  end?: string;
}

const starState: IStarState = {
  channelInfo: null,
  keyword: null,
  line: null,
  video: null,
  isLoading: true,
};

const starSlice = createSlice({
  name: 'starReducer',
  initialState: starState,
  reducers: {
    starDataUpdate: (state, action) => {
      state.channelInfo = action.payload.channelInfo;
      state.keyword = action.payload.keyword;
      state.line = [action.payload.line];
      state.video = [action.payload.video];
      state.isLoading = false;
    },
    starPieSliceStateUpdate: (state, action) => {
      if (state.keyword.current !== action.payload) {
        state.keyword.current = action.payload;
      }
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
  },
});

const periodState: IStarState = {
  keyword: null,
  video: null,
  isLoading: true,
  start: null,
  end: null,
};

const periodSlice = createSlice({
  name: 'periodReducer',
  initialState: periodState,
  reducers: {
    periodDataUpdate: (state, action) => {
      state.keyword = action.payload.keyword;
      state.video = action.payload.video;
      state.isLoading = false;
    },
    periodDateUpdate: (state, action) => {
      state.start = action.payload.start;
      state.end = action.payload.end;
    },
  },
});

const sliderSlice = createSlice({
  name: 'sliderReducer',
  initialState: {
    keyword: 0,
    statistics: 0,
    star: 0,
  },
  reducers: {
    sliderStateNext: (state, action) => {
      if (action.payload.page === 'keyword') {
        state.keyword !== action.payload.len ? (state.keyword += 1) : (state.keyword = 0);
      } else if (action.payload.page === 'statistics') {
        state.statistics !== action.payload.len ? (state.statistics += 1) : (state.statistics = 0);
      } else if (action.payload.page === 'star') {
        state.star !== action.payload.len ? (state.star += 1) : (state.star = 0);
      }
    },
    sliderStatePrev: (state, action) => {
      if (action.payload.page === 'keyword') {
        state.keyword !== 0 ? (state.keyword -= 1) : (state.keyword = action.payload.len);
      } else if (action.payload.page === 'statistics') {
        state.statistics !== 0 ? (state.statistics -= 1) : (state.statistics = action.payload.len);
      } else if (action.payload.page === 'star') {
        state.star !== 0 ? (state.star -= 1) : (state.star = action.payload.len);
      }
    },
  },
});

const pageSlice = createSlice({
  name: 'pageReducer',
  initialState: 'home',
  reducers: {
    currentPage: (state, action) => (state = action.payload),
  },
});

const headerSlice = createSlice({
  name: 'headerReducer',
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
  page: pageSlice.reducer,
  header: headerSlice.reducer,
  auth: authSlice.reducer,
});

const store = configureStore({
  reducer: cReducer,
});

export const {starDataUpdate, starPieSliceStateUpdate} = starSlice.actions;

export const {periodDataUpdate, periodDateUpdate} = periodSlice.actions;

export const {sliderStateNext, sliderStatePrev} = sliderSlice.actions;

export const {currentPage} = pageSlice.actions;

export const {setIsOpenSignIn, setIsOpenSignUp, setIsOpenUserMenu} = headerSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
