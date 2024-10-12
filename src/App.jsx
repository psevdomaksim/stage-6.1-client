import { BrowserRouter, Link } from "react-router-dom";
import "./App.css";
import AppRoutes from "./components/appRoutes";
import { ADD_POST_ROUTE, POST_LIST_ROUTE } from "./utils/routes_consts";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <div className="header">
            <Link to={POST_LIST_ROUTE}>
              {" "}
              <h1>Post List</h1>
            </Link>

            <Link className="add-post-btn" to={ADD_POST_ROUTE}>
              Add Post
            </Link>
          </div>
          <AppRoutes />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
