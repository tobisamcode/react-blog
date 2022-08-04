import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";

function App() {
  const [search, setSearch] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
        <Header title="React Js Blog" />
        <Nav search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="post" element={<NewPost />} />
          <Route path="post/:id" element={<PostPage />} />{" "}
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
