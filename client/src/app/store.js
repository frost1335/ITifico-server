import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "../services/articleApi";
import { articleReducer } from "../services/articleForm";

export default configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
    article: articleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(articleApi.middleware),
});
