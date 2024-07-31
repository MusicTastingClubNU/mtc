import { Outlet } from "react-router-dom";
import "./App.css";
import ImageScroller from "./imgs/IS/ImageScroller";
function App() {
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
