import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Signup } from "../pages/Signup";
import { Signin } from "../pages/Signin";
import { Blogs } from "../pages/Blogs";
import { Blog } from "../pages/Blog";
import { CreateBlog } from "../pages/CreateBlog";
import { Appbar } from "../components/Appbar";
import { Toast } from "../components/Toast";
import { HomePage } from "../pages/HomePage";
import { PrivateRoutes } from "../components/PrivateRoutes";

import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const location = useLocation();
  const shouldShowAppbar = !["/signin", "/signup", "/"].includes(location.pathname);
  return (
    <>
      <Toast />
      {shouldShowAppbar && (
        <Appbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/blogs" element={<Blogs searchQuery={searchQuery} />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blog/publish" element={<CreateBlog />} />
        </Route>
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
