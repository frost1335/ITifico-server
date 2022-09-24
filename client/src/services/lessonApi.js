import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/api";

export const lessonApi = createApi({
  reducerPath: "lessonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      "Content-Type": "application/json; charset=utf-8; charset=utf-8",
    },
  }),
  tagTypes: ["Lesson"],
  endpoints: (builder) => ({
    getLessons: builder.query({
      query: () => ({
        url: "/lesson",
      }),
      providesTags: ["Lesson"],
    }),
    getLesson: builder.query({
      query: (id) => ({
        url: `/lesson/${id}`,
      }),
      providesTags: ["Lesson"],
    }),
    createLesson: builder.mutation({
      query: (article) => ({
        url: `/lesson`,
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["Lesson"],
    }),
    editLesson: builder.mutation({
      query: (lesson) => ({
        url: `/lesson/${lesson._id}`,
        method: "PUT",
        body: lesson,
      }),
      invalidatesTags: ["Lesson"],
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/lesson/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lesson"],
    }),
  }),
});

export const {
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useEditLessonMutation,
  useGetLessonQuery,
  useGetLessonsQuery,
} = lessonApi;
