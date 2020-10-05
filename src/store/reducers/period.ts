import {createSlice} from '@reduxjs/toolkit';
import {IWordMapData, IVideoListData} from '../store';

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
}

const initialState: IinitialStateProps = {
  keyword: null,
  video: null,
  isLoading: true,
  start: null,
  end: null,
};

export const periodSlice = createSlice({
  name: 'periodReducer',
  initialState,
  reducers: {
    periodDataUpdate: (state, action) => {
      state.keyword = action.payload.keyword;
      state.video = action.payload.video;
      state.isLoading = false;
    },
    periodDateUpdate: (state, action) => {
      state.start = action.payload.start;
      state.end = action.payload.end;
    },
  },
});

export const {periodDataUpdate, periodDateUpdate} = periodSlice.actions;
