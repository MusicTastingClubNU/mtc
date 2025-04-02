import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import ImageScroller from "./imgs/IS/ImageScroller";
import { useEffect } from "react";
import Login from "./firebase/Login";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.search;
    if (path) {
      const decodedPath = path.replace("?", "/");
      navigate(decodedPath, { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <Outlet />
      <div className="image-scroller">
        <ImageScroller />
      </div>
    </>
  );
}

export default App;
