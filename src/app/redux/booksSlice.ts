import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface BookData {
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
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book.isbn !== action.payload);
    },
    editBook: (state, action: PayloadAction<{ isbn: string, updatedBook: BookData }>) => {
      const { isbn, updatedBook } = action.payload;
      const index = state.books.findIndex(book => book.isbn === isbn);
      if (index !== -1) {
        state.books[index] = updatedBook;
      }
    },
  },
});

export const { setBooks, deleteBook, editBook } = booksSlice.actions;
export const selectBooks = (state: RootState) => state.books.books;
export default booksSlice.reducer;
