import { format } from "date-fns";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "./api/posts";
import { useContext } from "react";
import DataContext from "./context/DataContext";

function EditPost() {
  const { posts, setPosts, editBody,editTitle,setEditTitle,setEditBody } = useContext(DataContext);

    const navigate = useNavigate();

    const { id } = useParams();
    const post = posts.find(post => post.id == id);

    useEffect(
        () => {
            if (post) {
                setEditTitle(post.title);
                setEditBody(post.body);
            }
        },
        [post, setEditTitle, setEditBody]
    );

    const handleEdit = async id => {
        const datetime = format(new Date(), "MMMM dd yyyy pp");
        const UpdatedPost = { id, title: editTitle, datetime, body: editBody };
        try {
            const response = await api.put(`/posts/${id}`, UpdatedPost);
            setPosts(
                posts.map(post => (post.id === id ? { ...response.data } : post))
            );
            setEditTitle("");
            setEditBody("");
            navigate("/");
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    };

    return (
        <main className="NewPost">
          
        {editTitle && 
            <>
                <h2>Edit Post</h2>
                <form onSubmit={(e) => e.preventDefault()} className="newPostForm">
                    <label htmlFor="postTitle">Title:</label>
                    <input
                        type="text"
                        id="postTitle"
                        required
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                    />
                    <label htmlFor="editBody">Post:</label>
                    <textarea
                        type="text"
                        id="postBody"
                        required
                        value={editBody}
                        onChange={e => setEditBody(e.target.value)}
                    />
                    <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                </form>
            </>
        }
        {!editTitle && 
            <>
                <h2>Post Not Found</h2>
                <p>Well, that's dissapointing.</p>
                <p>
                    <Link to='/'>Visit Our Homepage</Link>
                </p>
            </>

        }
    </main>
    );

}

export default EditPost;
