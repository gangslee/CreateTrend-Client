import { createSlice } from "@reduxjs/toolkit";

interface IinitialStateProps {
  token: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    id: number;
    userinfo: {
      id: number;
      phone: string;
      on_subscribe: boolean;
      own_channel: string;
      user_id: number;
    };
    username: string;
  };
} // 사용자 인증에 사용되는 data들을 담아둘 state 형식을 type으로 선언

const initialState: IinitialStateProps = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
}; // 사용자 인증의 초기 state 선언

export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    userLoading: (state) => {
      state.isLoading = true;
    }, // 사용자 정보를 서버로부터 가져오는 과정에서 로딩 상태를 로딩 중으로 변경

    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    }, // 서버로부터 인증 여부를 확인하고, 전달 받은 data를 state에 반영

    removeToken: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    }, // 페이지에서 로그아웃을 실시할 경우 브라우저에 존재하는 인증 token을 파괴

    setToken: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = localStorage.getItem("token");
      state.isAuthenticated = true;
      state.isLoading = false;
    }, // 로그인 또는 회원가입을 통해 사용자 인증에 성공한 경우에 브라우저의 localstorage에 인증 token 생성

    setUserInfo: (state, action) => {
      state.user = action.payload.user;
    }, // 서버로부터 전달 받은 사용자 정보를 state에 전달
  },
}); // 사용자 인증에서 state 관리/변경에 사용되는 reducer들을 선언 후 createSlice를 통해 initialState와 결합 후 외부 파일에서 사용할 수 있도록 export

export const {
  userLoading,
  userLoaded,
  removeToken,
  setToken,
  setUserInfo,
} = authSlice.actions;
// 앞서 선언한 reducer들을 외부에서 직접적으로 사용할 수 있도록 export
