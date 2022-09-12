import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "../services/articleApi";
import { articleReducer } from "../services/articleForm";
import { tagApi } from "../services/tagApi";

export default configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    article: articleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware, tagApi.middleware),
});
