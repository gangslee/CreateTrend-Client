import {createSlice} from '@reduxjs/toolkit';

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
}

const initialState: IinitialStateProps = {
  data: null,
  page: 1,
  isLoading: true,
  error: null,
};

export const searchYoutuberSlice = createSlice({
  name: 'searchYoutuberReducer',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    currentPagination: (state, action) => {
      state.page = action.payload;
    },
    nextPagination: (state) => {
      state.page = state.page % 10 === 0 ? state.page + 1 : (state.page / 10 + 1) * 10 + 1;
    },
    prevPagination: (state) => {
      state.page = state.page % 10 === 0 ? state.page - 19 : (state.page / 10 - 1) * 10 + 1;
    },
  },
});

export const {
  setLoading,
  setData,
  nextPagination,
  prevPagination,
  currentPagination,
} = searchYoutuberSlice.actions;
