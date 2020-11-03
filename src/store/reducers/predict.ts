import { createSlice } from "@reduxjs/toolkit";
import { ILineChartData } from "../types";

interface IinitialStateProps {
  thumbnail: string;
  text: {
    title: string;
    subscriber: string;
    date: string;
    keyword: string;
  };
  keywordList: string[];
  lines: ILineChartData[];
  title: string;
  date: string;
  isLoading: boolean;
}

const initialState: IinitialStateProps = {
  thumbnail: null,
  text: {
    title: null,
    subscriber: null,
    date: null,
    keyword: null,
  },
  keywordList: [],
  lines: null,
  title: null,
  date: null,
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
      if (state.text.keyword) {
        state.keywordList.push(state.text.keyword);
        state.text.keyword = null;
      }
      console.log(state.keywordList.length);
    },
    filterKeyword: (state, action) => {
      state.keywordList = state.keywordList.filter(
        (word) => word !== action.payload
      );
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
  setLoading,
} = predictSlice.actions;
