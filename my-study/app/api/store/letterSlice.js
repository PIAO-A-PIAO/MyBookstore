import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inbox: { initialized: false, inbox: [] },
  drafts: { initialized: false, drafts: [] },
  current: {},
};

export const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    setInboxState: (state, action) => {
      state.inbox.initialized = true;
      Object.assign(state.inbox.inbox, action.payload);
    },
    setDraftsState: (state, action) => {
      state.drafts.initialized = true;
      Object.assign(state.drafts.drafts, action.payload);
    },
    setCurrentState: (state, action) => {
      Object.assign(state.current, action.payload);
    },
  },
});
export const selectCurrentState = (state) => state.letter.current;
export const selectInboxState = (state) => state.letter.inbox;
export const selectDraftsState = (state) => state.letter.drafts;
export const { setInboxState, setDraftsState, setCurrentState } =
  letterSlice.actions;
export const letterReducer = letterSlice.reducer;
