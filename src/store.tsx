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
  useAble?: boolean;
}

const keywordData: IKeywordData = {
  wordmap: null,
  lines: null,
  keyword: null,
  video: null,
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
      state.useAble = true;
    },
  },
});

const cReducer = combineReducers({
  keyword: keywordSlice.reducer,
});

const store = configureStore({
  reducer: cReducer,
});

export const {keywordDataUpdate} = keywordSlice.actions;

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
