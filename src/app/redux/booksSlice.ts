import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface BookData {
  bookId: string;
  isbn: string;
  name: string;
  price: string;
  category: string;
  author: string;
  image: string;
}
export interface BooksState {
  books: BookData[];
}

const initialState: BooksState = {
  books: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<BookData[]>) => {
      state.books = action.payload;
    },
  },
});

export const { setBooks } = booksSlice.actions;
export const selectBooks = (state: RootState) => state.books.books;
export default booksSlice.reducer;
