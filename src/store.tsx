import { configureStore, createSlice, combineReducers } from "@reduxjs/toolkit";

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
  comment: ICommentData[];
  lines: ILineChartData[];
  keyword: IKeywordChartData[];
  video: IVideoListData[];
}

const keywordData: IKeywordData = {
  wordmap: null,
  comment: null,
  lines: null,
  keyword: null,
  video: null,
};

const keywordSlice = createSlice({
  name: "keywordReducer",
  initialState: keywordData,
  reducers: {
    add: (state, action) => {
      state.wordmap = action.payload.wordmap;
      state.comment = action.payload.comment;
      state.lines = action.payload.lines;
      state.keyword = action.payload.keyword;
      state.video = action.payload.video;
    },
  },
});

const cReducer = combineReducers({
  keyword: keywordSlice.reducer,
});
