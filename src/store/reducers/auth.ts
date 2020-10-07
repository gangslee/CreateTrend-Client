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
}

const initialState: IinitialStateProps = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    userLoading: (state) => {
      state.isLoading = true;
    },
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    removeToken: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setToken: (state, action) => {
      console.log(action.payload);
      localStorage.setItem("token", action.payload.token);
      state.token = localStorage.getItem("token");
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const {
  userLoading,
  userLoaded,
  removeToken,
  setToken,
  setUserInfo,
} = authSlice.actions;
