import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/HOME/HomePAGE";
import WeeklyEntry from "../components/WE/WeeklyEntryPAGE";
import FAQComponent from "../components/FAQ/FAQComponentPAGE";
import ExecBoard from "../components/ABOUT/AboutPAGE";
import Blog from "../components/BLOG/BlogPAGE";
import DevPage from "../components/DEV/DevPAGE";
import Activities from "../components/ACTIVITIES/ActivitiesPAGE";

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
