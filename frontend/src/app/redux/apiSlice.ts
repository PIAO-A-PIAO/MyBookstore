import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookData } from "./booksSlice";
import { baseUrl } from "../utils";
const baseQuery = fetchBaseQuery({
  baseUrl,
  mode:"cors",
  prepareHeaders: (headers) => {
    headers.set("Accept", "plain/text, application/json");
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const apiSlice:any = createApi({
  baseQuery,
  tagTypes: ["booklist"],
  endpoints: (builder) => ({
    getBooklist: builder.query<any, void>({
      query: () => "/booklist",
      providesTags: ["booklist"],
    }),
    getCategories: builder.query<any, void>({
      query: () => "/categories",
    }),
    addBook: builder.mutation<any, BookData>({
      // Define the query function to send the input data to the server
      query: (input) => ({
        url: "/add-book",
        method: "POST",
        body: { ...input },
        // Assuming input is already properly formatted
      }),
      // Define the tags to be invalidated after a successful mutation
      invalidatesTags: ["booklist"],
    }),
    deleteBook: builder.mutation<any, any>({
      query: (input) => ({
        url: "/delete-book",
        method: "POST",
        body: { ...input },
      }),
      invalidatesTags: ["booklist"],
    }),
    editBook: builder.mutation<any, any>({
      query: (input) => ({
        url: "/edit-book",
        method: "POST",
        body: { ...input },
      }),
      invalidatesTags: ["booklist"],
    }),
  }),
});

// Destructure the generated hooks
export const {
  useGetBooklistQuery,
  useGetCategoriesQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
} = apiSlice;
