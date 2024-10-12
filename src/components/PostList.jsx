import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EDIT_POST_ROUTE } from "../utils/routes_consts";
import { deletePost, fetchPosts } from "../http/postApi";
import "../App.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  const removePost = async (id) => {
    if (window.confirm(`Do you really want to delete post with id = ${id}?`)) {
      try {
        await deletePost(id);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <table className="post-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Status</th>
            <th>Tasks</th>
            <th>Additional Select</th>
            <th>Additional Text</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.author}</td>
              <td>{post.title}</td>
              <td>{post.description}</td>
              <td>{post.category}</td>
              <td>{post.status}</td>
              <td>
                {post.tasks.length > 0 ? (
                  <ul className="task-list">
                    {post.tasks.map((task) => (
                      <li key={task.taskName} className="task-item">
                        <strong>{task.taskName}</strong> - {task.taskStatus}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>No tasks</span>
                )}
              </td>
              <td>{post.additionalSelect}</td>
              <td>{post.additionalText}</td>
              <td>
                <Link to={EDIT_POST_ROUTE + `/${post.id}`} className="edit-btn">
                  Edit
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => removePost(post.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
