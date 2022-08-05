const NewPost = ({
  posts,
  setPosts,
  postTitle,
  setPostTitle,
  postBody,
  setPostBody
}) => {
  const handleSubmit = () => {
    // const id =
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
