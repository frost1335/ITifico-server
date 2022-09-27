import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "../services/articleApi";
import { authReducer } from "../services/auth";
import { courseApi } from "../services/courseApi";
import { imagesApi } from "../services/imagesApi";
import { lessonApi } from "../services/lessonApi";
import { lngDetectReducer } from "../services/lngDetector";
import { practiseApi } from "../services/practiseApi";
import { tagApi } from "../services/tagApi";

export default configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [imagesApi.reducerPath]: imagesApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
    [practiseApi.reducerPath]: practiseApi.reducer,
    lngDetect: lngDetectReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      articleApi.middleware,
      tagApi.middleware,
      imagesApi.middleware,
      courseApi.middleware,
      lessonApi.middleware,
      practiseApi.middleware
    ),
});
