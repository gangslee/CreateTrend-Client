import { createSlice } from "@reduxjs/toolkit";

interface IinitialStateProps {
  data: {
    thumbnail_url: string;
    channel_description: string;
    channel_name: string;
    channel_start_date: string;
    subscriber_num: number;
  }[];
}

const initialState: IinitialStateProps = {
  data: null,
};

export const searchYoutuberSlice = createSlice({
  name: "searchYoutuberReducer",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = searchYoutuberSlice.actions;
