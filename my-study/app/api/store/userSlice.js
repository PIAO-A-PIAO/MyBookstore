import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  initialized: false,
  user: {
    _id:"",
    profile: "",
    userName: "",
    region: "",
    roomName: "",
    stamps: [],
    paperStyles: [],
    contacts: [],
    badges: [],
    languages: [],
    onboarded: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => initialState,
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

export const { resetUser, setUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;
