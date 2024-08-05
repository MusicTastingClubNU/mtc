import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/HOME/Home";
import WeeklyEntry from "../components/WE/WeeklyEntry";
import FAQComponent from "../components/FAQ/FAQComponent";
import ExecBoard from "../components/ABOUT/ExecBoard";
import Blog from "../components/BLOG/Blog";
import { DevPage } from "../components/DEV/Dev";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "picks", element: <WeeklyEntry /> },
      { path: "faq", element: <FAQComponent /> },
      { path: "about", element: <ExecBoard /> },
      { path: "blog", element: <Blog /> },
      { path: "dev", element: <DevPage /> },
    ],
  },
]);
