import { Navigate, Route, Routes } from "react-router-dom";
import { TagControl } from "./components";
import { ArticleList, CreateArticle } from "./features/Articles";
import {
  CourseForm,
  CoursesList,
  LessonForm,
  LessonList,
} from "./features/Courses";
import { PractiseForm, PractiseList } from "./features/Practise";
import PractiseDetail from "./features/PractiseDetail/PractiseDetail";
import Layout from "./layout/Layout";
import {
  ArticleDetail,
  Articles,
  Auth,
  CourseDetail,
  Courses,
  LessonDetail,
} from "./pages";
import { useGetCoursesQuery } from "./services/courseApi";
import { useGetImagesQuery } from "./services/imagesApi";
import { useGetLessonsQuery } from "./services/lessonApi";
import { useGetPractisesQuery } from "./services/practiseApi";

const App = () => {
  useGetCoursesQuery();
  useGetLessonsQuery();
  useGetImagesQuery();
  useGetPractisesQuery();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Layout />}>
        <Route path="/articles" element={<Articles />}>
          <Route index element={<ArticleList />} />
          <Route path="form" element={<CreateArticle />} />
          <Route path="view/:articleId" element={<ArticleDetail />} />
        </Route>
        <Route path="tags" element={<TagControl />} />
        <Route path="/courses" element={<Courses />}>
          <Route index element={<CoursesList />} />
          <Route path="form" element={<CourseForm />} />
          <Route path="view/:courseId" element={<CourseDetail />} />
          <Route
            path="view/:courseId/:lessonId/:unitName"
            element={<CourseDetail />}
          />
          <Route path="lessons" element={<LessonList />} />
          <Route path="lessons/form" element={<LessonForm />} />
          <Route path="lessons/view/:lessonId" element={<LessonDetail />} />
          <Route path="practise/list" element={<PractiseList />} />
          <Route path="practise/form" element={<PractiseForm />} />
          <Route
            path="practise/view/:practiseId"
            element={<PractiseDetail />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
