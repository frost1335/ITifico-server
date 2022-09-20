import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "../services/articleApi";
import { articleReducer } from "../services/articleForm";
import { authReducer } from "../services/auth";
import { imagesApi } from "../services/imagesApi";
import { lngDetectReducer } from "../services/lngDetector";
import { tagApi } from "../services/tagApi";

export default configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [imagesApi.reducerPath]: imagesApi.reducer,
    article: articleReducer,
    lngDetect: lngDetectReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      articleApi.middleware,
      tagApi.middleware,
      imagesApi.middleware
    ),
});
