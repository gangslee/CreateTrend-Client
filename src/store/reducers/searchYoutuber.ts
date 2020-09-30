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
}

const initialState: IinitialStateProps = {
  data: null,
  page: 1,
};

export const searchYoutuberSlice = createSlice({
  name: 'searchYoutuberReducer',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setData} = searchYoutuberSlice.actions;
