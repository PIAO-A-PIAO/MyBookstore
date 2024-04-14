import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store"; // Assuming you have a store configured
import { BookData } from "./booksSlice";

interface PopupState {
  showPopup: boolean;
  currentBook: BookData | null;
  title: string;
  type: string;
  mobileView: boolean;
}

const initialState: PopupState = {
  showPopup: false,
  currentBook: null,
  title: "",
  type: "",
  mobileView: false,
};

interface PopupProps {
  type: string;
  book?: BookData;
}

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setMobileView: (state, action: PayloadAction<boolean>) => {
      state.mobileView = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCurrentBook: (state, action: PayloadAction<BookData>) => {
      state.currentBook = action.payload;
    },
    handleShowPopup: (state, action: PayloadAction<PopupProps>) => {
      state.type = action.payload.type;
      if (action.payload.book) {
        state.currentBook = action.payload.book;
      }
      state.showPopup = true;
    },
    handleHidePopup: (state) => {
      state.currentBook = null;
      state.showPopup = false;
    },
  },
});

// Selectors
export const selectShowPopup = (state: RootState) => state.popup.showPopup;
export const selectTitle = (state: RootState) => state.popup.title;
export const selectCurrentBook = (state: RootState) => state.popup.currentBook;
export const selectType = (state: RootState) => state.popup.type;
export const selectMobileView = (state: RootState) => state.popup.mobileView;

// Export actions
export const { setCurrentBook, handleHidePopup, handleShowPopup, setTitle, setMobileView } =
  popupSlice.actions;

// Export reducer
export default popupSlice.reducer;
