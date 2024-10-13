import {
  ADD_POST_ROUTE,
  EDIT_POST_ROUTE,
  POST_LIST_ROUTE,
} from "../utils/routes_consts";
import AddPost from "../pages/AddPost";
import EditPost from "../pages/EditPost";
import PostList from "./PostList";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ADD_POST_ROUTE} element={<AddPost />} exact />
      <Route path={EDIT_POST_ROUTE + "/:id"} element={<EditPost />} exact />
      <Route path={POST_LIST_ROUTE} element={<PostList />} exact />

      <Route path="*" element={<Navigate to={POST_LIST_ROUTE} />} />
    </Routes>
  );
};
export default AppRoutes;
