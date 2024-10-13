import { $host } from "./http";

export const fetchPosts = async () => {
  const { data } = await $host.get("api/post");
  return data;
};

export const fetchPostById = async (id) => {
  const { data } = await $host.get(`api/post/${id}`);
  return data;
};

export const createPost = async (postData) => {
  const { data } = await $host.post("api/post", postData);
  return data;
};

export const updatePost = async (id, postData) => {
  const { data } = await $host.put(`api/post/${id}`, postData);
  return data;
};

export const deletePost = async (id) => {
  const { data } = await $host.delete(`api/post/${id}`);
  return data;
};
