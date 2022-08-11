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
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

import { DataProvider } from "./context/DataContext";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(
    () => {
      setPosts(data);
    },
    [data]
  );

  useEffect(
    () => {
      const filteredResults = posts.filter(
        post =>
          post.body.toLowerCase().includes(search.toLowerCase()) ||
          post.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(filteredResults.reverse());
    },
    [posts, search]
  );

  return (
    <div className="App">
      <DataProvider>
        <BrowserRouter>
          <Header title="React Js Blog" />
          <Nav search={search} setSearch={setSearch} />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  posts={searchResults}
                  fetchError={fetchError}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="post"
              element={
                <NewPost
                  posts={posts}
                  setPosts={setPosts}
                  postTitle={postTitle}
                  setPostTitle={setPostTitle}
                  postBody={postBody}
                  setPostBody={setPostBody}
                />
              }
            />
            <Route
              path="edit/:id"
              element={
                <EditPost
                  posts={posts}
                  setPosts={setPosts}
                  editTitle={editTitle}
                  setEditTitle={setEditTitle}
                  editBody={editBody}
                  setEditBody={setEditBody}
                />
              }
            />
            <Route
              path="post/:id"
              element={<PostPage posts={posts} setPosts={setPosts} />}
            />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
