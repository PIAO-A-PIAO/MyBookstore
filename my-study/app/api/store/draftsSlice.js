import { createSlice } from "@reduxjs/toolkit";

const initialState = { initialized: false, drafts: [] };

export const draftsSlice = createSlice({
  name: "drafts",
  initialState,
  reducers: {
    resetDrafts: () => initialState,
    updateDrafts: (state) => {
      state.initialized = false;
    },

    setDrafts: (state, action) => {
      state.initialized = true;
      Object.assign(state.drafts, action.payload);
    },
  },
});
export const selectDraftsState = (state) => state.drafts;
export const { updateDrafts, resetDrafts, setDrafts } = draftsSlice.actions;
export const draftsReducer = draftsSlice.reducer;
