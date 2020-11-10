import { createSlice } from "@reduxjs/toolkit";
import { IWordMapData, ILineChartData, IVideoListData } from "../types";

export interface IStarState {
  channelInfo?: {
    idx: number;
    thumbnail_url: string;
    channel_description: string;
    channel_name: string;
    channel_start_date: string;
    subscriber: number;
  };
  keyword: {
    pie: {
      name: string;
      value: number;
      wordmap: IWordMapData;
    }[];
    current: 0;
  };
  wordmap?: {
    name: string;
    color: string;
    children: {
      name: string;
      color: string;
      value: number;
    }[];
  };
  line?: ILineChartData[];
  video: IVideoListData[];
  isLoading?: boolean;
  start?: string;
  end?: string;
} // 스타 채널 분석 페이지에 사용되는 data들을 담아둘 state 형식을 type으로 선언

const initialState: IStarState = {
  channelInfo: null,
  keyword: null,
  line: null,
  video: null,
  wordmap: null,
  isLoading: true,
}; // 스타 채널 분석 페이지의 초기 state 선언

export const starSlice = createSlice({
  name: "starReducer",
  initialState,
  reducers: {
    starDataUpdate: (state, action) => {
      state.channelInfo = action.payload.channelInfo;
      state.keyword = action.payload.keyword;
      state.line = [action.payload.line];
      state.video = [action.payload.video];
      state.wordmap = action.payload.wordmap;
      state.isLoading = false;
    }, // API를 통해 서버와 통신을 통해 정상적으로 data를 전달 받았을 경우 state에 data를 전달 후 차트 로딩 상태를 해제

    starPieSliceStateUpdate: (state, action) => {
      if (state.keyword.current !== action.payload) {
        state.keyword.current = action.payload;
      }
    }, // 페이지 내 '콘텐츠 분포'에 사용되는 PieChart의 현재 키워드 선택 여부를 확인 후 state 변경

    setLoading: (state) => {
      state.isLoading = true;
    }, // 스타 채널 분석 페이지의 로딩 상태를 로딩 중으로 변경
  },
}); // 스타 채널 분석 페이지에서 state 관리/변경에 사용되는 reducer들을 선언 후 createSlice를 통해 initialState와 결합 후 외부 파일에서 사용할 수 있도록 export

export const { starDataUpdate, starPieSliceStateUpdate } = starSlice.actions;
// 앞서 선언한 reducer들을 외부에서 직접적으로 사용할 수 있도록 export
