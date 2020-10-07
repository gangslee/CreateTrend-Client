import { createSlice } from "@reduxjs/toolkit";

interface IinitialStateProps {
  keyword: number;
  statistics: number;
  star: number;
}

const initialState: IinitialStateProps = {
  keyword: 0,
  statistics: 0,
  star: 0,
};

export const sliderSlice = createSlice({
  name: "sliderReducer",
  initialState,
  reducers: {
    sliderStateNext: (state, action) => {
      if (action.payload.page === "keyword") {
        state.keyword !== action.payload.len
          ? (state.keyword += 1)
          : (state.keyword = 0);
      } else if (action.payload.page === "statistics") {
        state.statistics !== action.payload.len
          ? (state.statistics += 1)
          : (state.statistics = 0);
      } else if (action.payload.page === "star") {
        state.star !== action.payload.len
          ? (state.star += 1)
          : (state.star = 0);
      }
    },
    sliderStatePrev: (state, action) => {
      if (action.payload.page === "keyword") {
        state.keyword !== 0
          ? (state.keyword -= 1)
          : (state.keyword = action.payload.len);
      } else if (action.payload.page === "statistics") {
        state.statistics !== 0
          ? (state.statistics -= 1)
          : (state.statistics = action.payload.len);
      } else if (action.payload.page === "star") {
        state.star !== 0
          ? (state.star -= 1)
          : (state.star = action.payload.len);
      }
    },
  },
});

export const { sliderStateNext, sliderStatePrev } = sliderSlice.actions;
