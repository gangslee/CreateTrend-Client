import { createSlice } from "@reduxjs/toolkit";
import {
  IWordMapData,
  ILineChartData,
  IKeywordChartData,
  IVideoListData,
} from "../types";

export interface IKeywordData {
  wordmap: IWordMapData;
  lines: ILineChartData[];
  keyword: IKeywordChartData[];
  video: IVideoListData[];
  currentChart: number;
  isLoading: boolean;
} // 콘텐츠(키워드) 분석 페이지에 사용되는 data들을 담아둘 state 형식을 type으로 선언

const initialState: IKeywordData = {
  wordmap: null,
  lines: null,
  keyword: null,
  video: null,
  currentChart: 0,
  isLoading: true,
}; // 콘텐츠(키워드) 분석 페이지의 초기 state 선언

export const keywordSlice = createSlice({
  name: "keywordReducer",
  initialState,
  reducers: {
    keywordDataUpdate: (state, action) => {
      state.wordmap = action.payload.wordmap;
      state.lines = action.payload.lines;
      state.keyword = action.payload.keyword;
      state.video = action.payload.video;
      state.currentChart = 0;
      state.isLoading = false;
    }, // API를 통해 서버로부터 받은 data를 state에 전달 후 로딩 상태를 해제

    setRadioState: (state) => {
      state.currentChart === 0
        ? (state.currentChart = 1)
        : (state.currentChart = 0);
    }, // 페이지 내 라디오버튼의 상태를 변경

    setLoading: (state) => {
      state.isLoading = true;
    }, // 페이지의 로딩 상태를 로딩 중으로 변경
  },
}); // 콘텐츠(키워드) 분석 페이지에서 state 관리/변경에 사용되는 reducer들을 선언 후 createSlice를 통해 initialState와 결합 후 외부 파일에서 사용할 수 있도록 export

export const {
  keywordDataUpdate,
  setRadioState,
  setLoading,
} = keywordSlice.actions;
// 앞서 선언한 reducer들을 외부에서 직접적으로 사용할 수 있도록 export
