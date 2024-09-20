import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface UserState {
  userId: String;
  userName: String;
  region: String;
  virtualAddress: String;
  zipCode: String;
  stamps: [String];
  paperStyles: [String];
  contacts: [String];
  badges: [String];
  languages: [String];
  onboarded: Boolean | null;
}
const initialState: UserState = {
  userId: "",
  userName: "",
  region: "",
  virtualAddress: "",
  zipCode: "",
  stamps: [""],
  paperStyles: [""],
  contacts: [""],
  badges: [""],
  languages: [""],
  onboarded: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);

    },
  },
});
export const selectUser = (state: RootState) => state.user;

export const { setUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;
