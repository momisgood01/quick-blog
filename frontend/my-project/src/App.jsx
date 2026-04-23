import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Blog from "./Components/Pages/Blog";
import Dashboard from "./Components/Pages/admin/Dashboard";
import AddBlog from "./Components/Pages/admin/AddBlog";
import Comment from "./Components/Pages/admin/Comment";
import Layout from "./Components/Pages/admin/layout";
import BlogList from "./Components/Pages/admin/ListBlog";
import Login from "./Components/admin/Login";
import "quill/dist/quill.snow.css";
import {Toaster} from "react-hot-toast"
import { useAppContext } from "./context/AppContext";

const App = () => {
  const {token} = useAppContext()
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />

        {/* Admin routes */}
        <Route path="/admin" element={token ? <Layout /> : <Login/> }>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="comments" element={<Comment />} />
          <Route path="BlogList" element={<BlogList />} />

        </Route>
      
      </Routes>
    </>
  );
};

export default App;
