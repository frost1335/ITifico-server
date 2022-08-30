import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { Articles, Auth, Courses } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Layout />}>
        <Route path="articles" element={<Articles />} />
        <Route path="courses" element={<Courses />} />
      </Route>
    </Routes>
  );
};

export default App;
