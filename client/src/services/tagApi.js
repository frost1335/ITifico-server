import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const tagApi = createApi({
  reducerPath: "tagApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      "Content-Type": "application/json; charset=utf-8; charset=utf-8",
    },
  }),
  tagTypes: ["Tag"],
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => ({
        url: "/tag",
      }),
      providesTags: ["Tag"],
    }),
    createTag: builder.mutation({
      query: (tag) => ({
        url: `/tag`,
        method: "POST",
        body: tag,
      }),
      invalidatesTags: ["Tag"],
    }),
    editTag: builder.mutation({
      query: (tag) => ({
        url: `/tag/${tag._id}`,
        method: "PUT",
        body: tag,
      }),
      invalidatesTags: ["Tag"],
    }),
    deleteTag: builder.mutation({
      query: (id) => ({
        url: `/tag/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tag"],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useCreateTagMutation,
  useDeleteTagMutation,
  useEditTagMutation,
} = tagApi;
