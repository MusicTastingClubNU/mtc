import React from "react";
import "../../App.css";
import SalesPitch from "../SP/salespitch";
import ImageScroller from "../../imgs/IS/ImageScroller";
import FAQComponent from "../FAQ/FAQComponent";
import ExecBoard from "../ABOUT/ExecBoard";
import WeeklyEntry from "../WE/WeeklyEntry";
import BlackButton from "../../BlackButton1";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileComponent from "../../MobileComponent";
import Blog from "../BLOG/Blog";
import "../SP/mission.css";
import { Link } from "react-router-dom";

const TitleAndDirectory = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [value2, setValue2] = React.useState(0);

  const handleChange2 = (newValue: number) => {
    setValue2(newValue);
  };

  return (
    <>
      <div>{isMobile ? <MobileComponent /> : null}</div>
      <div className="all" style={{ position: "relative" }}>
        <header className="header">MUSIC TASTING CLUB</header>

        <h5 className="header2">
          NORTHWESTERN'S PREMIER MUSIC DISCOURSE GROUP
        </h5>

        {isMobile ? null : (
          <div className="nav-bar-cont">
            <Link to={`/`}>
              <p className="nav-item">
                <BlackButton buttonText="Home" />
              </p>
            </Link>

            <Link to={`/picks`}>
              <p className="nav-item">
                <BlackButton buttonText="Picks" />
              </p>
            </Link>

            <Link to={`/faq`}>
              <p className="nav-item" onClick={() => handleChange2(2)}>
                <BlackButton buttonText="FAQ" />
              </p>
            </Link>

            <Link to={`/about`}>
              <p className="nav-item" onClick={() => handleChange2(3)}>
                <BlackButton buttonText="About" />
              </p>
            </Link>

            <Link to={`/blog`}>
              <p className="nav-item" onClick={() => handleChange2(4)}>
                <BlackButton buttonText="Blog" />
              </p>
            </Link>

            <Link to={`/activities`}>
              <p className="nav-item" onClick={() => handleChange2(5)}>
                <BlackButton buttonText="Activites" />
              </p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default TitleAndDirectory;
