import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Letter {
  senderId: String;
  recipientId: String;
  contents: [String];
  attachments: [String];
  title: String;
  stampUsed: String;
  paperStyle: String;
  fromAddress: String;
  fromRegion: String;
  toAddress: String;
  toRegion: String;
  language: String;
  isDraft: Boolean | null;
  isSent: Boolean | null;
  isRead: Boolean | null;
}

export interface LetterState {
  unread: [Letter];
  unsent: [Letter];
  current: Letter;
}

const initialState: LetterState = {
  unread: <[Letter]>{},
  unsent: <[Letter]>{},
  current: <Letter>{},
};

export const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    setUnreadState: (state, action: PayloadAction<[Letter]>) => {
      state.unread = action.payload;
    },
    setUnsentState: (state, action: PayloadAction<[Letter]>) => {
      state.unsent = action.payload;
    },
    setCurrentState: (state, action: PayloadAction<Partial<Letter>>) => {
      Object.assign(state.current, action.payload);
    },
  },
});

export const { setUnreadState, setUnsentState, setCurrentState } = letterSlice.actions;
export const letterReducer = letterSlice.reducer;
