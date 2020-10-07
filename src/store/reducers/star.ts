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
  line?: ILineChartData[];
  video: IVideoListData[];
  isLoading?: boolean;
  start?: string;
  end?: string;
}

const initialState: IStarState = {
  channelInfo: null,
  keyword: null,
  line: null,
  video: null,
  isLoading: true,
};

export const starSlice = createSlice({
  name: "starReducer",
  initialState,
  reducers: {
    starDataUpdate: (state, action) => {
      state.channelInfo = action.payload.channelInfo;
      state.keyword = action.payload.keyword;
      state.line = [action.payload.line];
      state.video = [action.payload.video];
      state.isLoading = false;
    },
    starPieSliceStateUpdate: (state, action) => {
      if (state.keyword.current !== action.payload) {
        state.keyword.current = action.payload;
      }
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const { starDataUpdate, starPieSliceStateUpdate } = starSlice.actions;
