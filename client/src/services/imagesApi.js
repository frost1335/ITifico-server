import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/api";

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
    getImages: builder.query({
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
    createImage: builder.mutation({
      query: (article) => ({
        url: `/article`,
        method: "POST",
        body: article,
        header: {},
      }),
      invalidatesTags: ["Article"],
    }),
    editImage: builder.mutation({
      query: (article) => ({
        url: `/article/${article.get("_id")}`,
        method: "PUT",
        body: article,
      }),
      invalidatesTags: ["Article"],
    }),
    deleteImage: builder.mutation({
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
