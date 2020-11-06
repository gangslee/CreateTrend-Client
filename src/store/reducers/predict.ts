import { createSlice } from '@reduxjs/toolkit';
import { ILineChartData } from '../types';

interface IinitialStateProps {
  thumbnail: string;
  text: {
    title: string;
    subscriber: string;
    date: string;
    keyword: string;
    include: string;
    exclude: string;
  };
  keywordList: {
    keyword: string[];
    include: string[];
    exclude: string[];
  };
  keywordResult: {
    current: number;
    data: {
      idx: number;
      channel_thumbnail_url: string;
      video_thumbnail_url: string;
      video_name: string;
      channel_name: string;
    }[];
  };
  lines: ILineChartData[];
  title: string;
  date: string;
  isAdvance: boolean;
  isLoading: boolean;
}

const initialState: IinitialStateProps = {
  thumbnail: null,
  text: {
    title: null,
    subscriber: null,
    date: null,
    keyword: null,
    include: null,
    exclude: null,
  },
  keywordList: {
    keyword: [],
    include: [],
    exclude: [],
  },
  keywordResult: {
    current: null,
    data: [],
  },
  lines: null,
  title: null,
  date: null,
  isAdvance: false,
  isLoading: false,
};

export const predictSlice = createSlice({
  name: 'predictReducer',
  initialState,
  reducers: {
    setPredictData: (state, action) => {
      state.thumbnail = action.payload.thumbnail;
    },
    setTextData: (state, action) => {
      state.text = action.payload;
    },
    setResult: (state, action) => {
      state.lines = [action.payload.lines];
      state.title = state.text.title;
      state.date = state.text.date;
      state.isLoading = false;
    },
    pushKeyword: (state, action) => {
      if (
        action.payload === 'keyword-form' &&
        state.text.keyword &&
        !state.keywordList.keyword.includes(state.text.keyword)
      ) {
        state.keywordList.keyword.push(state.text.keyword);
        state.text.keyword = null;
      } else if (
        action.payload === 'include-form' &&
        state.text.include &&
        !state.keywordList.include.includes(state.text.include)
      ) {
        state.keywordList.include.push(state.text.include);
        state.text.include = null;
      } else if (
        action.payload === 'exclude-form' &&
        state.text.exclude &&
        !state.keywordList.exclude.includes(state.text.exclude)
      ) {
        state.keywordList.exclude.push(state.text.exclude);
        state.text.exclude = null;
      }
    },
    filterKeyword: (state, action) => {
      console.log(action.payload);
      if (action.payload.className === 'keyword-remove') {
        state.keywordList.keyword = state.keywordList.keyword.filter(
          (word) => word !== action.payload.keyword
        );
        console.log(state.keywordList.keyword.length);
      } else if (action.payload.className === 'include-remove') {
        state.keywordList.include = state.keywordList.include.filter(
          (word) => word !== action.payload.keyword
        );
      } else if (action.payload.className === 'exclude-remove') {
        state.keywordList.exclude = state.keywordList.exclude.filter(
          (word) => word !== action.payload.keyword
        );
      }
    },
    setKeywordResult: (state, action) => {
      state.keywordResult.data = action.payload;
    },
    setKeywordResultCurrent: (state, action) => {
      state.keywordResult.current = action.payload;
    },
    setAdvance: (state) => {
      state.isAdvance = !state.isAdvance;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const {
  setPredictData,
  setTextData,
  setResult,
  pushKeyword,
  filterKeyword,
  setKeywordResult,
  setKeywordResultCurrent,
  setAdvance,
  setLoading,
} = predictSlice.actions;
