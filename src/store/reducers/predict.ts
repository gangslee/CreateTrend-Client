import { createSlice } from "@reduxjs/toolkit";
import { ILineChartData } from "../types";

interface IinitialStateProps {
  thumbnail: string;
  text: {
    title: string;
    subscriber: string;
    date: string;
    include: string;
    exclude: string;
  };
  keywordList: {
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
    include: null,
    exclude: null,
  },
  keywordList: {
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
  name: "predictReducer",
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
    pushKeyword: (state) => {
      if (state.text.include) {
        state.keywordList.include.push(state.text.include);
        state.text.include = null;
      }
    },
    filterKeyword: (state, action) => {
      state.keywordList.include = state.keywordList.include.filter(
        (word) => word !== action.payload
      );
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
