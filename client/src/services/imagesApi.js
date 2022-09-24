import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.REACT_APP_BASE_URL + "/api";

export const imagesApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    headers: {
      "Content-Type": "application/json; charset=utf-8; charset=utf-8",
    },
  }),
  tagTypes: ["Images"],
  endpoints: (builder) => ({
    getImages: builder.query({
      query: (component) => ({
        url: "/images",
        params: {
          component,
        },
      }),
      providesTags: ["Images"],
    }),
    getImage: builder.query({
      query: (id) => ({
        url: `/images/${id}`,
      }),
      providesTags: ["Images"],
    }),
    createImage: builder.mutation({
      query: (image) => ({
        url: `/images`,
        method: "POST",
        body: image,
        header: {},
      }),
      invalidatesTags: ["Images"],
    }),
    editImage: builder.mutation({
      query: (image) => ({
        url: `/images/${image.get("_id")}`,
        method: "PUT",
        body: image,
        header: {},
      }),
      invalidatesTags: ["Images"],
    }),
    deleteImage: builder.mutation({
      query: (id) => ({
        url: `/images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Images"],
    }),
  }),
});

export const {
  useCreateImageMutation,
  useDeleteImageMutation,
  useEditImageMutation,
  useGetImageQuery,
  useGetImagesQuery,
} = imagesApi;
