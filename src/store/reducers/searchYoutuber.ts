import { createSlice } from "@reduxjs/toolkit";

interface IinitialStateProps {
  data: {
    idx: number;
    thumbnail_url: string;
    channel_description: string;
    channel_name: string;
    channel_start_date: string;
    subscriber_num: number;
    max_views_count: number;
    video_counts: number;
    recent_videos: string[];
  }[];
  page: number;
  isLoading: boolean;
  error: string;
} // 스타 채널 검색 결과 페이지에 사용되는 data들을 담아둘 state 형식을 type으로 선언

const initialState: IinitialStateProps = {
  data: null,
  page: 1,
  isLoading: true,
  error: null,
}; // 스타 채널 검색 결과 페이지의 초기 state 선언

export const searchYoutuberSlice = createSlice({
  name: "searchYoutuberReducer",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    }, // 스타 채널 검색 결과 페이지의 로딩 상태를 로딩 중으로 변경

    setData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    }, // API를 통해 서버와 통신을 통해 정상적으로 data를 전달 받았을 경우 state에 data를 전달 후 페이지 로딩 상태를 해제

    currentPagination: (state, action) => {
      state.page = action.payload;
    }, // 페이지 내 Pagination Component의 현재 index 값을 변경

    nextPagination: (state) => {
      state.page =
        state.page % 10 === 0 ? state.page + 1 : (state.page / 10 + 1) * 10 + 1;
    }, // 페이지 내 Pagination Component의 index 값을 다음 index 값으로 변경

    prevPagination: (state) => {
      state.page =
        state.page % 10 === 0
          ? state.page - 19
          : (state.page / 10 - 1) * 10 + 1;
    }, // 페이지 내 Pagination Component의 index 값을 이전 index 값으로 변경
  },
});

export const {
  setLoading,
  setData,
  nextPagination,
  prevPagination,
  currentPagination,
} = searchYoutuberSlice.actions;
