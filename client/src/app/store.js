import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "../services/articleApi";

export default configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(articleApi.middleware),
});
