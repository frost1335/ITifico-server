import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/api";

export const practiseApi = createApi({
  reducerPath: "practiseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      "Content-Type": "application/json; charset=utf-8; charset=utf-8",
    },
  }),
  tagTypes: ["Practise"],
  endpoints: (builder) => ({
    getPractises: builder.query({
      query: () => ({
        url: "/practise",
      }),
      providesTags: ["Practise"],
    }),
    getPractise: builder.query({
      query: (id) => ({
        url: `/practise/${id}`,
      }),
      providesTags: ["Practise"],
    }),
    getByLesson: builder.query({
      query: (lessonId) => ({
        url: `/practise/getbylesson/${lessonId}`,
      }),
      providesTags: ["Practise"],
    }),
    createPractise: builder.mutation({
      query: (practise) => ({
        url: `/practise`,
        method: "POST",
        body: practise,
      }),
      invalidatesTags: ["Practise"],
    }),
    editPractise: builder.mutation({
      query: (practise) => ({
        url: `/practise/${practise._id}`,
        method: "PUT",
        body: practise,
      }),
      invalidatesTags: ["Practise"],
    }),
    deletePractise: builder.mutation({
      query: (id) => ({
        url: `/practise/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Practise"],
    }),
  }),
});

export const {
  useCreatePractiseMutation,
  useDeletePractiseMutation,
  useEditPractiseMutation,
  useGetPractiseQuery,
  useGetPractisesQuery,
  useGetByLessonQuery,
} = practiseApi;
