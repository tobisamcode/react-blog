import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import About from "./About";
import Error from "./Error";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";

import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <Header title="React Js Blog" />
      <DataProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="post" element={<NewPost />} />
            <Route path="edit/:id" element={<EditPost />} />
            <Route path="post/:id" element={<PostPage />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
