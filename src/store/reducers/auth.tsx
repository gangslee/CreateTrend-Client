import { createSlice } from "@reduxjs/toolkit";

interface IinitialStateProps {
  token: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
}

const initialState: IinitialStateProps = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export const AuthSlice = createSlice({
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
    authError: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      console.log(action.payload.token);
      state.isAuthenticated = true;
      state.isLoading = false;
    },
  },
});

export const {
  userLoading,
  userLoaded,
  authError,
  loginSuccess,
} = AuthSlice.actions;
