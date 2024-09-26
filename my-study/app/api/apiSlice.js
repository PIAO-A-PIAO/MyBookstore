import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectToken } from "./store/tokenSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().token;
      if (token) {
        headers.set("token", `${token?.token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["token", "user", "Drafts", "inbox"],
  endpoints: (builder) => ({
    signin: builder.query({
      query: (formData) => ({
        url: "/Users/signin",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["token"],
    }),
    signup: builder.query({
      query: (formData) => ({
        url: "/Users/signup",
        method: "POST",
        body: formData,
      }),
    }),
    logout: builder.query({
      query: () => "/Users/logout",
    }),
    getUser: builder.query({
      query: () => "/Users/get-user",
      providesTags: ["user"],
    }),
    getDrafts: builder.query({
        query: () => "/Letters/get-drafts",
        providesTags: (result) =>
          result?.drafts
            ? [
                ...result.drafts.map(({ id }) => ({ type: "Drafts", id })), 
                { type: "Drafts", id: "LIST" }, 
              ]
            : [{ type: "Drafts", id: "LIST" }],
      }),
      saveDraft: builder.mutation({
        query: (formData) => ({
          url: "/Letters/save-draft",
          method: "POST",
          body: formData,
        }),
        invalidatesTags: [{ type: "Drafts", id: "LIST" }],
      }),
    getInbox: builder.query({
      query: () => "/Letters/get-inbox",
      providesTags: ["inbox"],
    }),
    onboard: builder.query({
      query: (formData) => ({
        url: "Users/onboard",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["token"],
    }),
  }),
});

export const {
  useLazySigninQuery,
  useLazySignupQuery,
  useLazyLogoutQuery,
  useLazyGetDraftsQuery,
  useLazyGetInboxQuery,
  useSaveDraftMutation,
  useLazyOnboardQuery,
  useLazyGetUserQuery,
} = apiSlice;
