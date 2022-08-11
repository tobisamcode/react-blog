import { useState, useEffect } from "react";

import { createContext } from "react";
import api from "../api/posts";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { width } = useWindowSize();

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
    <DataContext.Provider value={{ width }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
