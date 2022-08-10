import { format } from "date-fns";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api/posts";

function EditPost({
    posts,
    setPosts,
    editBody,
    editTitle,
    setEditTitle,
    setEditBody
}) {
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
            </>
            }
    </main>
    );

}

export default EditPost;
