import { createSlice } from "@reduxjs/toolkit";
import { ILineChartData } from "../types";

interface IinitialStateProps {
  video: {
    video_views: number;
    video_popularity: number;
    avg_popularity: number;
    avg_videoviews: number;
    video: {
      video_name: string;
      video_id: string;
      thumbnail_url: string;
      video_description: string;
      videolikes: {
        likes: number;
        dislikes: number;
      }[];
      videokeywordnew: {
        keyword: string;
      }[];
    };
  };
  lines: ILineChartData[];
  channel: {
    thumbnail_url: string;
    channel_description: string;
    channel_name: string;
    subscriber_num: number;
  };
  isLoading: boolean;
} // 영상 상세분석 페이지에 사용되는 data들을 담아둘 state 형식을 type으로 선언

const initialState: IinitialStateProps = {
  video: null,
  lines: null,
  channel: null,
  isLoading: true,
}; // 영상 상세분석 페이지의 초기 state 선언

export const videoDetailSlice = createSlice({
  name: "videoDetailReducer",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    }, // 페이지의 로딩 상태를 로딩 중으로 변경

    setData: (state, action) => {
      state.channel = action.payload.channel;
      state.lines = [action.payload.lines];
      state.video = action.payload.video;
      state.isLoading = false;
    }, // API를 통해 서버와 통신을 통해 정상적으로 data를 전달 받았을 경우 state에 data를 전달 후 로딩 중인 페이지 상태를 해제
  },
}); // 영상 상세분석 페이지에서 state 관리/변경에 사용되는 reducer들을 선언 후 createSlice를 통해 initialState와 결합 후 외부 파일에서 사용할 수 있도록 export

export const { setLoading, setData } = videoDetailSlice.actions;
// 앞서 선언한 reducer들을 외부에서 직접적으로 사용할 수 있도록 export
