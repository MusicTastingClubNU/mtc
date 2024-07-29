import React from "react";
import "./App.css";
import SalesPitch from "./components/SP/salespitch";
import ImageScroller from "./imgs/IS/ImageScroller";
// import ImageScroller2 from './imgs/IS/ImageScroller2';
import FAQComponent from "./components/FAQ/FAQComponent";
import ExecBoard from "./components/ABOUT/ExecBoard";
import WeeklyEntry from "./components/WE/WeeklyEntry";
import BlackButton from "./BlackButton1";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileComponent from "./MobileComponent";
import Blog from "./components/BLOG/Blog";

function App() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [value, setValue] = React.useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const renderNewPage = () => {
    switch (value) {
      case 0:
        return <SalesPitch />;
      case 1:
        return <WeeklyEntry />;
      case 2:
        return <FAQComponent />;
      case 3:
        return <ExecBoard />;
      case 4:
        return <Blog />;
      default:
        return <SalesPitch />;
    }
  };

  return (
    <React.Fragment>
      <div>
        {isMobile ? <MobileComponent handleChange={handleChange} /> : null}
      </div>
      <div className="all" style={{ position: "relative" }}>
        <header className="header">MUSIC TASTING CLUB</header>
        <div className="image-scroller">
          <ImageScroller></ImageScroller>
        </div>
        <h5 className="header2">
          NORTHWESTERN'S PREMEIR MUSIC DISCOURSE GROUP
        </h5>

        {isMobile ? null : (
          <div className="nav-bar-cont">
            <p className="nav-item" onClick={() => handleChange(0)}>
              <BlackButton buttonText="Home" />
            </p>
            <p className="nav-item" onClick={() => handleChange(1)}>
              <BlackButton buttonText="Picks" />
            </p>
            <p className="nav-item" onClick={() => handleChange(2)}>
              <BlackButton buttonText="FAQ" />
            </p>
            <p className="nav-item" onClick={() => handleChange(3)}>
              <BlackButton buttonText="About" />
            </p>
            <p className="nav-item" onClick={() => handleChange(4)}>
              <BlackButton buttonText="Blog" />
            </p>
          </div>
        )}
        {renderNewPage()}
      </div>
    </React.Fragment>
  );
}

export default App;
