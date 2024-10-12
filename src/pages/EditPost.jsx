import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost, fetchPostById } from "../http/postApi";
import PostForm from "../components/PostForm";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await fetchPostById(id);
        setOriginalData(postData);
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdatePost = async (data) => {
    const changes = {};

    Object.keys(data).forEach((key) => {
      if (data[key] !== originalData[key]) {
        changes[key] = data[key];
      }
    });

    if (Object.keys(changes).length > 0) {
      await updatePost(id, changes);
    }

    navigate("/");
  };

  if (loading) {
    return <div>Loading post data...</div>;
  }

  return (
    <div className="container">
      <h1>Edit Post</h1>
      {originalData && (
        <PostForm defaultValues={originalData} onSubmit={handleUpdatePost} />
      )}
    </div>
  );
}
