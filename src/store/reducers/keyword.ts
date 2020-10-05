import {createSlice} from '@reduxjs/toolkit';
import {IWordMapData, ILineChartData, IKeywordChartData, IVideoListData} from '../store';

export interface IKeywordData {
  wordmap: IWordMapData;
  lines: ILineChartData[];
  keyword: IKeywordChartData[];
  video: IVideoListData[];
  currentChart: number;
}

const initialState: IKeywordData = {
  wordmap: null,
  lines: null,
  keyword: null,
  video: null,
  currentChart: 0,
};

export const keywordSlice = createSlice({
  name: 'keywordReducer',
  initialState,
  reducers: {
    keywordDataUpdate: (state, action) => {
      state.wordmap = action.payload.wordmap;
      state.lines = action.payload.lines;
      state.keyword = action.payload.keyword;
      state.video = action.payload.video;
      state.currentChart = 0;
    },
    setRadioState: (state) => {
      state.currentChart === 0 ? (state.currentChart = 1) : (state.currentChart = 0);
    },
    callLoader: (state) => {
      state.keyword = null;
      state.lines = null;
      state.video = null;
      state.wordmap = null;
      state.currentChart = 0;
    },
  },
});

export const {keywordDataUpdate, setRadioState, callLoader} = keywordSlice.actions;
