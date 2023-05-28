import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Class from "./pages/Class";
import Login from "./pages/Login";
import User from "./pages/User";
import Course from "./pages/Course";
import OpenCourse from "./pages/OpenCourse";
import RegisterCourse from "./pages/RegisterCourse";
import RegisteredOpenCourse from "./pages/RegisteredOpenCourse";
import Page403 from "./pages/Page403";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/">
        <Route path="/" element={<PrivateRoute roles={["admin"]} />}>
          <Route path="/class" element={<Class />} />
          <Route path="/user" element={<User />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/openCourse" element={<OpenCourse />} />
        </Route>
        <Route index element={<Header />} />
        <Route path="/register-course" element={<RegisterCourse />} />
        <Route path="/registered-course" element={<RegisteredOpenCourse />} />
      </Route>
      <Route path="/403" element={<Page403 />} />
    </Routes>
  );
};

export default App;
