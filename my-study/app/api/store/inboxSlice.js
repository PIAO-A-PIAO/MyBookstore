import { createSlice } from "@reduxjs/toolkit";

const initialState = { initialized: false, inbox: [] };

export const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    resetInbox: () => initialState,
    updateInbox: (state) => {
      state.initialized = false;
    },

    setInbox: (state, action) => {
      state.initialized = true;
      Object.assign(state.inbox, action.payload);
    },
  },
});
export const selectInboxState = (state) => state.inbox;
export const { updateInbox, resetInbox, setInbox } = inboxSlice.actions;
export const inboxReducer = inboxSlice.reducer;
