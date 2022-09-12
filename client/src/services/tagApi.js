import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const tagApi = createApi({
  reducerPath: "tagApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["Tags"],
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => ({
        url: "/tag",
      }),
      providesTags: ["Tags"],
    }),
    createTag: builder.mutation({
      query: (tag) => ({
        url: `/tag`,
        method: "POST",
        body: tag,
      }),
      invalidatesTags: ["Tags"],
    }),
    editTag: builder.mutation({
      query: (tag) => ({
        url: `/tag/${tag._id}`,
        method: "PUT",
        body: tag,
      }),
      invalidatesTags: ["Tags"],
    }),
    deleteTag: builder.mutation({
      query: ({ id }) => ({
        url: `/tag/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tags"],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useCreateTagMutation,
  useDeleteTagMutation,
  useEditTagMutation,
} = tagApi;
