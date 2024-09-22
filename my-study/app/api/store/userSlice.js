import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  _id: "",
  userName: "",
  region: "",
  virtualAddress: "",
  zipCode: "",
  stamps: [""],
  paperStyles: [""],
  contacts: [""],
  badges: [""],
  languages: [""],
  profile:"",
  onboarded: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        if (key in state) {
          state[key] = action.payload[key];
        }
      });
    },
  },
});

export const selectUser = (state) => state.user;

export const { setUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;
