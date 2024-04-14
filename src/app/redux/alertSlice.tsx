import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store"; // Assuming you have a store configured
import { BookData } from "./booksSlice";

interface AlertState {
  showAlert: boolean;
  success: boolean;
  message: string;
}

const initialState: AlertState = {
  showAlert: false,
  success: true,
  message: "",
};

interface AlertProps {
  success: boolean;
  message: string;
}

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    handleShowAlert: (state, action: PayloadAction<AlertProps>) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.showAlert = true;
    },
    handleHideAlert: (state) => {
      state.showAlert = false;
    },
  },
});

// Selectors
export const selectAlertProps = (state: RootState) => state.alert;

// Export actions
export const { handleShowAlert, handleHideAlert } =
  alertSlice.actions;

// Export reducer
export default alertSlice.reducer;
