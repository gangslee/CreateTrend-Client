import { createSlice } from "@reduxjs/toolkit";
import { IKeywordChartData } from "../types";

interface IinitialStateProps {
  keywordChart: IKeywordChartData[];
  currentChart?: number;
  currentKeyword?: number;
  isChecked: boolean;
  isLoadingChart: boolean;
  isLoadingData: boolean;
} // 유튜브 통계 분석(메인) 페이지에 사용되는 data들을 담아둘 state 형식을 type으로 선언

const initialState: IinitialStateProps = {
  keywordChart: null,
  currentChart: 0,
  currentKeyword: 0,
  isChecked: false,
  isLoadingChart: true,
  isLoadingData: true,
}; // 유튜브 통계 분석(메인) 페이지의 초기 state 선언

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
        state.isLoadingChart = false;
      } // API를 통해 서버와 통신을 통해 정상적으로 인기/영상 차트에 사용될 키워드 data를 전달 받았을 경우 state에 data를 전달 후 차트 로딩 상태를 해제
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
        state.isLoadingData = false;
      } // API를 통해 서버와 통신을 통해 정상적으로 최초 키워드(인기 차트의 1순위) data를 전달 받았을 경우 state에 data를 전달 후 페이지 내 잔여 로딩 상태를 해제
    },

    chartStateUpdate: (state) => {
      state.currentChart === 0
        ? (state.currentChart = 1)
        : (state.currentChart = 0);
      state.currentKeyword = 0;
      if (!state.keywordChart[state.currentChart].keyword[0].visit) {
        state.isLoadingData = true;
      } // 선택된 키워드의 차트 타입(인기/영상화)을 확인 후 변경, 최초 방문 시 인기/영상화 차트를 제외한 페이지 내 다른 component들의 로딩 상태를 로딩 중으로 변경
    },

    keywordStateUpdate: (state, action) => {
      if (
        !state.keywordChart[state.currentChart].keyword[action.payload].visit
      ) {
        state.isLoadingData = true;
      }
      state.currentKeyword = action.payload;
    }, // 선택된 키워드의 방문 여부를 확인 후 최초 방문 시 인기/영상화 차트를 제외한 페이지 내 다른 component들의 로딩 상태를 로딩 중으로 변경 후 현재 순위 state값을 변경

    setLoadingChart: (state) => {
      state.isLoadingChart = true;
    }, // 인기/영상화 차트의 로딩 상태를 로딩 중으로 변경
  },
}); // 유튜브 통계 분석(메인) 페이지에서 state 관리/변경에 사용되는 reducer들을 선언 후 createSlice를 통해 initialState와 결합 후 외부 파일에서 사용할 수 있도록 export

export const {
  statisticsDataUpdate,
  keywordDetailUpdate,
  chartStateUpdate,
  keywordStateUpdate,
  setLoadingChart,
} = statisticsSlice.actions;
// 앞서 선언한 reducer들을 외부에서 직접적으로 사용할 수 있도록 export
