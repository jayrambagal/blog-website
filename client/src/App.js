import Auth from "./components/Auth";
import AddBlog from "./components/AddBlog";
import UserBlogs from "./components/UserBlog";
import EditBlog from "./components/EditBlog";
import ReadBlog from "./components/ReadBlog";
import React from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  return ( 
      <main>
        <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/blogs/add" element={<AddBlog/>} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/edit/:id" element={<EditBlog/>} />
              <Route path="/read/:id" element={<ReadBlog/>} />
         </Routes>
      </main>
  );
}
export default App;
