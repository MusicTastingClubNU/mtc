import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/HOME/Home";
import WeeklyEntry from "../components/WE/WeeklyEntry";
import FAQComponent from "../components/FAQ/FAQComponent";
import ExecBoard from "../components/ABOUT/ExecBoard";
import Blog from "../components/BLOG/Blog";
import DevPage from "../components/DEV/Dev";
import Activities from "../components/ACTIVITIES/Activities";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "picks", element: <WeeklyEntry /> },
      { path: "faq", element: <FAQComponent /> },
      { path: "club", element: <Activities /> },
      { path: "blog", element: <Blog /> },
      { path: "exec", element: <ExecBoard /> },
      { path: "dev", element: <DevPage /> },
    ],
  },
]);
