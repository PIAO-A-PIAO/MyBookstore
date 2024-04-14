import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookData } from "./booksSlice";

const baseUrl = "http://localhost:4000";
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    headers.set("Accept", "plain/text, application/json");
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["booklist"],
  endpoints: (builder) => ({
    getBooklist: builder.query<any, void>({
      query: () => "/booklist",
      providesTags: ["booklist"],
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
  }),
});

// Destructure the generated hooks
export const { useGetBooklistQuery, useAddBookMutation, useDeleteBookMutation } = apiSlice;
