import { createSlice } from "@reduxjs/toolkit";

interface IinitialStateProps {
  isOpenSignIn: boolean;
  isOpenSignUp: boolean;
  isOpenUserMenu: boolean;
  isMembership: boolean;
}

const initialState: IinitialStateProps = {
  isOpenSignIn: false,
  isOpenSignUp: false,
  isOpenUserMenu: false,
  isMembership: true,
};

export const headerSlice = createSlice({
  name: "headerReducer",
  initialState,
  reducers: {
    setIsOpenSignIn: (state, action) => {
      state.isOpenSignIn = action.payload;
      state.isOpenSignUp = false;
    },
    setIsOpenSignUp: (state, action) => {
      state.isOpenSignUp = action.payload;
      state.isOpenSignIn = false;
    },

    setIsOpenUserMenu: (state, action) => {
      state.isOpenUserMenu = action.payload;
    },
  },
});

export const {
  setIsOpenSignIn,
  setIsOpenSignUp,
  setIsOpenUserMenu,
} = headerSlice.actions;
