import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  unread: {},
  unsent: {},
  current: {},
};

export const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    setUnreadState: (state, action) => {
      state.unread = action.payload;
    },
    setUnsentState: (state, action) => {
      state.unsent = action.payload;
    },
    setCurrentState: (state, action) => {
      Object.assign(state.current, action.payload);
    },
  },
});

export const { setUnreadState, setUnsentState, setCurrentState } = letterSlice.actions;
export const letterReducer = letterSlice.reducer;
