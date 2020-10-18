import { createSlice } from "@reduxjs/toolkit";

interface IinitialStateProps {
    thumbnail:string;
    title:string;
    subscriber:number;
    date:string;
    isLoading:boolean;
}

const initialState: IinitialStateProps = {
    thumbnail : null,
    title : null,
    subscriber: null,
    date : null,
    isLoading: false,
};

export const predictSlice = createSlice({
  name: "predictReducer",
  initialState,
  reducers: {
    setPredictData : (state, action) =>{
      console.log(action.payload)
      state.thumbnail = action.payload.thumbnail
    }
  },
});

export const {setPredictData} = predictSlice.actions;
