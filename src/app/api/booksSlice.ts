import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Book {
  isbn: string;
  name: string;
  price: number;
  category: string;
  author: string;
  image: string;
}
export interface BooksState {
  books: Book[];
}

const initialState: BooksState = {
  books: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book.isbn !== action.payload);
    },
    editBook: (state, action: PayloadAction<{ isbn: string, updatedBook: Book }>) => {
      const { isbn, updatedBook } = action.payload;
      const index = state.books.findIndex(book => book.isbn === isbn);
      if (index !== -1) {
        state.books[index] = updatedBook;
      }
    },
  },
});

export const { setBooks, addBook, deleteBook, editBook } = booksSlice.actions;
export const selectBooks = (state: BooksState) => state.books;
export default booksSlice.reducer;
