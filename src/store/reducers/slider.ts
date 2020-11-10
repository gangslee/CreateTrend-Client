import { createSlice } from "@reduxjs/toolkit";

interface IinitialStateProps {
  current: number;
} // Slider Component에 사용되는 data들을 담아둘 state 형식을 type으로 선언

const initialState: IinitialStateProps = {
  current: 0,
}; // Slider Component의 초기 state 선언

export const sliderSlice = createSlice({
  name: "sliderReducer",
  initialState,
  reducers: {
    sliderStateNext: (state, action) => {
      state.current !== action.payload.len
        ? (state.current += 1)
        : (state.current = 0);
    }, // Slider의 현재 상태를 변경 시켜 다음 영상을 출력하도록 변경

    sliderStatePrev: (state, action) => {
      state.current !== 0
        ? (state.current -= 1)
        : (state.current = action.payload.len);
    }, // Slider의 현재 상태를 변경 시켜 이전 영상을 출력하도록 변경
  },
}); // Slider Component에서 state 관리/변경에 사용되는 reducer들을 선언 후 createSlice를 통해 initialState와 결합 후 외부 파일에서 사용할 수 있도록 export

export const { sliderStateNext, sliderStatePrev } = sliderSlice.actions;
// 앞서 선언한 reducer들을 외부에서 직접적으로 사용할 수 있도록 export
