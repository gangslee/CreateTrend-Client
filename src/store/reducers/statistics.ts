import { createSlice } from "@reduxjs/toolkit";
import { IKeywordChartData } from "../types";

interface IinitialStateProps {
  keywordChart: IKeywordChartData[];
  currentChart?: number;
  currentKeyword?: number;
  isChecked?: boolean;
}

const initialState: IinitialStateProps = {
  keywordChart: null,
  currentChart: 0,
  currentKeyword: 0,
  isChecked: false,
};

export const statisticsSlice = createSlice({
  name: "statisticsReducer",
  initialState,
  reducers: {
    statisticsDataUpdate: (state, action) => {
      if (action.payload) {
        state.keywordChart = action.payload;
        state.keywordChart.map((data) =>
          data.keyword.map((word) => (word.visit = false))
        );
        state.isChecked = true;
      }
    },
    keywordDetailUpdate: (state, action) => {
      if (action.payload) {
        state.keywordChart[action.payload.currentChart].keyword[
          action.payload.currentKeyword
        ].visit = true;
        state.keywordChart[action.payload.currentChart].keyword[
          action.payload.currentKeyword
        ].popular = Math.round(action.payload.data.keyword[0].popular);
        state.keywordChart[action.payload.currentChart].keyword[
          action.payload.currentKeyword
        ].wordmap = action.payload.data.keyword[0].wordmap;
        state.keywordChart[action.payload.currentChart].keyword[
          action.payload.currentKeyword
        ].line = [action.payload.data.keyword[0].lines];
        state.keywordChart[action.payload.currentChart].keyword[
          action.payload.currentKeyword
        ].video = [action.payload.data.keyword[0].video];
      }
    },
    disableUseAbleStatistics: (state) => {
      state.isChecked = false;
    },
    chartStateUpdate: (state) => {
      state.currentChart === 0
        ? (state.currentChart = 1)
        : (state.currentChart = 0);
      state.currentKeyword = 0;
    },
    keywordStateUpdate: (state, action) => {
      state.currentKeyword = action.payload;
    },
  },
});

export const {
  statisticsDataUpdate,
  keywordDetailUpdate,
  disableUseAbleStatistics,
  chartStateUpdate,
  keywordStateUpdate,
} = statisticsSlice.actions;
