import { useNavigate, useParams } from "react-router-dom";

const PostPage = ({posts, setPosts}) => {
  const { id } = useParams();
  const post = posts.find(post => post.id == id)


  const navigate = useNavigate()

  const handleDelete =  async(id) => {
    const remainingPosts = posts.filter(post => post.id != id);
    setPosts(remainingPosts);
    navigate("/");
  };

  return (
    <main className="PostPage">
      <article className="post">
        {
          post && 
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>

            <button onClick={() => handleDelete(post.id)}> Delete Post </button>
          </>
        }
      </article>
    </main>
  );
};

export default PostPage;
