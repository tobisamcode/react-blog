import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const NewPost = ({
  posts,
  setPosts,
  postTitle,
  setPostTitle,
  postBody,
  setPostBody
}) => {
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    navigate("/");
  };

  return (
    <main className="NewPost">
      <form onSubmit={handleSubmit} className="newPostForm">
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          required
          value={postTitle}
          onChange={e => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          type="text"
          id="postBody"
          required
          value={postBody}
          onChange={e => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
