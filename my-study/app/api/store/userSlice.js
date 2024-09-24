import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  initialized: false,
  user: {
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
    profile: "",
    onboarded: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.initialized = true;
      Object.keys(action.payload).forEach((key) => {
        if (key in state.user) {
          state.user[key] = action.payload[key];
        }
      });
    },
  },
});

export const selectUser = (state) => state.user;

export const { setUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;
