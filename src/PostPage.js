import { Link, useNavigate, useParams } from "react-router-dom";
import api from './api/posts'

const PostPage = ({ posts, setPosts }) => {
  const { id } = useParams();
  const post = posts.find(post => post.id == id)


  const navigate = useNavigate()

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const remainingPosts = posts.filter(post => post.id != id);
      setPosts(remainingPosts);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
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
            <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}> Delete Post </button>
          </>
        }
      </article>
    </main>
  );
};

export default PostPage;
