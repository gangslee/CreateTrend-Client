import { createSlice } from "@reduxjs/toolkit";

interface IinitialStateProps {
  searchTerm: string;
  searchType: number;
}

const initialState: IinitialStateProps = {
  searchTerm: "",
  searchType: 0,
};

export const homeSlice = createSlice({
  name: "HomeReducer",
  initialState,
  reducers: {
    searchTermUpdate: (state, action) => {
      state.searchTerm = action.payload;
    },
    searchTypeUpdate: (state) => {
      state.searchType === 0 ? (state.searchType = 1) : (state.searchType = 0);
    },
  },
});

export const { searchTermUpdate, searchTypeUpdate } = homeSlice.actions;
