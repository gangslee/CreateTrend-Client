import { createSlice } from "@reduxjs/toolkit";
import { ILineChartData } from "../types";

interface IinitialStateProps {
  thumbnail: string;
  text: {
    title: string;
    subscriber: string;
    date: string;
  };
  lines:ILineChartData[];
  title:string;
  date:string;
  isLoading: boolean;
}

const initialState: IinitialStateProps = {
  thumbnail: null,
  text: {
    title: null,
    subscriber: null,
    date: null,
  },
  lines:null,
  title:null,
  date:null,
  isLoading: false,
};

export const predictSlice = createSlice({
  name: "predictReducer",
  initialState,
  reducers: {
    setPredictData: (state, action) => {
      state.thumbnail = action.payload.thumbnail
    },
    setTextData: (state, action) => {
      state.text.title = action.payload.title
      state.text.subscriber = action.payload.subscriber
      state.text.date = action.payload.date
    },
    setResult:(state, action) =>{
      state.lines = [action.payload.lines]
      state.title = state.text.title
      state.date = state.text.date
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const { setPredictData, setTextData, setResult, setLoading } = predictSlice.actions;
