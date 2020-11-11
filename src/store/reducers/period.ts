import { createSlice } from "@reduxjs/toolkit";
import { IWordMapData, IVideoListData } from "../types";

interface IinitialStateProps {
  keyword: {
    pie: {
      name: string;
      value: number;
      wordmap: IWordMapData;
    }[];
    current: 0;
  };
  video: IVideoListData[];
  isLoading: boolean;
  start: string;
  end: string;
} // 스타 채널 상세 분석 페이지(기간 선택)에 사용되는 data들을 담아둘 state 형식을 type으로 선언

const initialState: IinitialStateProps = {
  keyword: null,
  video: null,
  isLoading: true,
  start: null,
  end: null,
}; // 스타 채널 상세 분석 페이지(기간 선택)의 초기 state 선언

export const periodSlice = createSlice({
  name: "periodReducer",
  initialState,
  reducers: {
    periodDataUpdate: (state, action) => {
      state.keyword = action.payload.keyword;
      state.video = action.payload.video;
      state.isLoading = false;
    }, // API를 통해 서버로부터 받은 data를 state에 전달 후 로딩 상태를 해제

    periodDateUpdate: (state, action) => {
      state.start = action.payload.start;
      state.end = action.payload.end;
    }, // 차트에서 action을 통해 선택 날짜를 변경 후 변경 날짜를 state에 반영
  },
}); // 스타 채널 상세 분석 페이지(기간 선택)에서 state 관리/변경에 사용되는 reducer들을 선언 후 createSlice를 통해 initialState와 결합 후 외부 파일에서 사용할 수 있도록 export

export const { periodDataUpdate, periodDateUpdate } = periodSlice.actions;
// 앞서 선언한 reducer들을 외부에서 직접적으로 사용할 수 있도록 export
