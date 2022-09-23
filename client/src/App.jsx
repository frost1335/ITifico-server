import { Navigate, Route, Routes } from "react-router-dom";
import { TagControl } from "./components";
import { ArticleList, CreateArticle } from "./features/Articles";
import {
  CourseForm,
  CoursesList,
  LessonForm,
  LessonList,
} from "./features/Courses";
import Layout from "./layout/Layout";
import { ArticleDetail, Articles, Auth, Courses } from "./pages";
import CourseDetail from "./pages/CourseDetail";

const App = () => {
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
          <Route path="view/:articleId" element={<CourseDetail />} />
          <Route path="lessons" element={<LessonList />} />
          <Route path="lessons/form" element={<LessonForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
