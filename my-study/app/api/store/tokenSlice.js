import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "" }
export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    resetToken: () => initialState,
    setTokenState: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const selectToken = (state) => state.token;

export const { resetToken, setTokenState } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
