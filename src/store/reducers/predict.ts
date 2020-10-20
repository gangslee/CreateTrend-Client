import { createSlice } from "@reduxjs/toolkit";

interface IinitialStateProps {
  thumbnail: string;
  text: {
    title: string;
    subscriber: string;
    date: string;
  }
  result:any;
  isLoading: boolean;
}

const initialState: IinitialStateProps = {
  thumbnail: null,
  text: {
    title: null,
    subscriber: null,
    date: null,
  },
  result:null,
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
      console.log(action.payload)
      state.result = action.payload
    }
  },
});

export const { setPredictData, setTextData, setResult } = predictSlice.actions;
