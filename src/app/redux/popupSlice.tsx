import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store'; // Assuming you have a store configured
import { BookData } from './booksSlice';

interface PopupState {
  showPopup: boolean;
  currentBook: BookData | null;
  title: string;
  type: string
}

const initialState: PopupState = {
  showPopup: false,
  currentBook: null,
  title: "",
  type: ""
};

interface PopupProps {
  type: string;
  title: string;
}

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCurrentBook: (state, action: PayloadAction<BookData>) => {
      state.currentBook = action.payload;
    },
    handleShowPopup: (state, action: PayloadAction<PopupProps>) => {
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.showPopup = true;
    },
    handleHidePopup: (state) => {
      state.currentBook = null;
      state.showPopup = false;
    }
  },
});

// Selectors
export const selectShowPopup = (state: RootState) => state.popup.showPopup;
export const selectTitle = (state: RootState) => state.popup.title;
export const selectCurrentBook = (state: RootState) => state.popup.currentBook;
export const selectType = (state: RootState) => state.popup.type;

// Export actions
export const { setCurrentBook, handleHidePopup, handleShowPopup, setTitle } = popupSlice.actions;

// Export reducer
export default popupSlice.reducer;
