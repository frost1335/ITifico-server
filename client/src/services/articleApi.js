import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      "Content-Type": "application/json; charset=utf-8; charset=utf-8",
    },
  }),
  tagTypes: ["Article"],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => ({
        url: "/article",
      }),
      providesTags: ["Article"],
    }),
    getArticle: builder.query({
      query: (id) => ({
        url: `/article/${id}`,
      }),
      providesTags: ["Article"],
    }),
    createArticle: builder.mutation({
      query: (article) => ({
        url: `/article`,
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["Article"],
    }),
    editArticle: builder.mutation({
      query: (article) => ({
        url: `/article/${article._id}`,
        method: "PUT",
        body: article,
      }),
      invalidatesTags: ["Article"],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/article/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Article"],
    }),
  }),
});

export const {
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useEditArticleMutation,
  useGetArticleQuery,
  useGetArticlesQuery,
} = articleApi;
