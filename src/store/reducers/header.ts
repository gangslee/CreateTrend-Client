import { createSlice } from "@reduxjs/toolkit";

interface IinitialStateProps {
  isOpenSignIn: boolean;
  isOpenSignUp: boolean;
  isOpenUserMenu: boolean;
  isMembership: boolean;
} // Global Navigation Bar(Header)에 사용되는 data들을 담아둘 state 형식을 type으로 선언

const initialState: IinitialStateProps = {
  isOpenSignIn: false,
  isOpenSignUp: false,
  isOpenUserMenu: false,
  isMembership: true,
}; // Global Navigation Bar(Header)의 초기 state 선언

export const headerSlice = createSlice({
  name: "headerReducer",
  initialState,
  reducers: {
    setIsOpenSignIn: (state, action) => {
      state.isOpenSignIn = action.payload;
      state.isOpenSignUp = false;
    }, // 로그인 modal을 화면에 출력, 회원가입 modal이 열려있을 경우 종료

    setIsOpenSignUp: (state, action) => {
      state.isOpenSignUp = action.payload;
      state.isOpenSignIn = false;
    }, // 회원가입 modal을 화면에 출력, 로그인 modal이 열려있을 경우 종료

    setIsOpenUserMenu: (state, action) => {
      state.isOpenUserMenu = action.payload;
    }, // 사용자 정보 메뉴를 화면에 출력
  },
}); // Global Navigation Bar(Header)에서 state 관리/변경에 사용되는 reducer들을 선언 후 createSlice를 통해 initialState와 결합 후 외부 파일에서 사용할 수 있도록 export

export const {
  setIsOpenSignIn,
  setIsOpenSignUp,
  setIsOpenUserMenu,
} = headerSlice.actions;
// 앞서 선언한 reducer들을 외부에서 직접적으로 사용할 수 있도록 export
