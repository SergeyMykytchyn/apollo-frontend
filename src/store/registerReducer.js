import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "register",
  initialState: {
    isFetching: false,
    isSuccessful: false,
    error: false
  },
  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.isSuccessful = true;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registerClear: (state) => {
      state.isFetching = false;
      state.isSuccessful = false;
      state.error = false;
    }
  }
});

export const { registerStart, registerSuccess, registerFailure, registerClear } = registerSlice.actions;
export default registerSlice.reducer;
