import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import ImageScroller from "./imgs/IS/ImageScroller";
import { useEffect } from "react";
import Login from "./firebase/Login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import NightModeToggle from "./components/DEV/NightModeToggle";
import { useThemeContext } from "./theme/ThemeContextProvider";
function App() {
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  useEffect(() => {
    const path = window.location.search;
    if (path) {
      const decodedPath = path.replace("?", "/");
      navigate(decodedPath, { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NightModeToggle />
        <Outlet />
        <div className="image-scroller">
          <ImageScroller />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
