// src/pages/AddPost.jsx
import { useNavigate } from "react-router-dom";
import { createPost } from "../http/postApi";
import PostForm from "../components/PostForm";

export default function AddPost() {
  const navigate = useNavigate();

  const handleCreatePost = async (data) => {
    await createPost(data);
    navigate("/");
  };

  const defaultValues = {
    title: "",
    description: "",
    author: "",
    category: "",
    status: "",
    tags: "",
    tasks: [],
    additionalText: "",
    additionalSelect: "",
  };

  return (
    <div className="container">
      <h1>Create a New Post</h1>
      <PostForm defaultValues={defaultValues} onSubmit={handleCreatePost} />
    </div>
  );
}
