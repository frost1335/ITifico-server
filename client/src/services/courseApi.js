import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      "Content-Type": "application/json; charset=utf-8; charset=utf-8",
    },
  }),
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: "/course",
      }),
      providesTags: ["Course"],
    }),
    getCourse: builder.query({
      query: (id) => ({
        url: `/course/${id}`,
      }),
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation({
      query: (course) => ({
        url: `/course`,
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["Course"],
    }),
    editCourse: builder.mutation({
      query: (course) => ({
        url: `/course/${course._id}`,
        method: "PUT",
        body: course,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetCourseQuery,
  useGetCoursesQuery,
} = courseApi;
