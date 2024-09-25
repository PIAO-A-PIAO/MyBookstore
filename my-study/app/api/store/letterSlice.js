import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inbox: { initialized: false, inbox: [] },
  drafts: { initialized: false, drafts: [] },
};

export const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    resetLetter: () => initialState,
    updateDrafts: (state) => {
      state.drafts.initialized = false;
    },
    setInboxState: (state, action) => {
      state.inbox.initialized = true;
      Object.assign(state.inbox.inbox, action.payload);
    },
    setDraftsState: (state, action) => {
      state.drafts.initialized = true;
      Object.assign(state.drafts.drafts, action.payload);
    },
  },
});
export const selectInboxState = (state) => state.letter.inbox;
export const selectDraftsState = (state) => state.letter.drafts;
export const { updateDrafts, resetLetter, setInboxState, setDraftsState } =
  letterSlice.actions;
export const letterReducer = letterSlice.reducer;
