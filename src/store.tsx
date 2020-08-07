import {configureStore, createSlice, combineReducers} from '@reduxjs/toolkit';

export interface IWordMapData {
  name: string;
  children: {
    name: string;
    value: number;
  }[];
}

export interface ICommentData {
  avatar: string;
  comment: string;
  thumbnail: string;
  link: string;
}

export interface ILineChartData {
  name: string;
  data: {
    date: string;
    value: number;
  }[];
}

export interface IKeywordChartData {
  name: string;
  data: string[];
}

export interface IVideoListData {
  type: string;
  data: {
    id: string;
    name: string;
    thumbnail: string;
    keyword?: string[];
  }[];
  current?: number;
}

export interface IAsideVideoListData {
  name: string;
  data: {
    name: string;
    thumbnail: string;
    link: string;
  }[];
}

export interface IKeywordData {
  wordmap: IWordMapData[];
  lines: ILineChartData[];
  keyword: IKeywordChartData[];
  video: IVideoListData[];
  asideVideo?: IAsideVideoListData[];
  useAble?: boolean;
}

const keywordData: IKeywordData = {
  wordmap: null,
  lines: null,
  keyword: null,
  video: null,
  asideVideo: null,
  useAble: false,
};

const keywordSlice = createSlice({
  name: 'keywordReducer',
  initialState: keywordData,
  reducers: {
    keywordDataUpdate: (state, action) => {
      state.wordmap = action.payload.wordmap;
      state.lines = action.payload.lines;
      state.keyword = action.payload.keyword;
      state.video = action.payload.video;
      state.asideVideo = action.payload.asideVideo;
      state.useAble = true;
    },
    sliderStateNext: (state, action) => {
      state.video[action.payload].current === 4
        ? (state.video[action.payload].current = 0)
        : (state.video[action.payload].current += 1);
    },
    sliderStatePrev: (state, action) => {
      state.video[action.payload].current === 0
        ? (state.video[action.payload].current = 4)
        : (state.video[action.payload].current -= 1);
    },
  },
});

const cReducer = combineReducers({
  keyword: keywordSlice.reducer,
});

const store = configureStore({
  reducer: cReducer,
});

export const {keywordDataUpdate, sliderStateNext, sliderStatePrev} = keywordSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
