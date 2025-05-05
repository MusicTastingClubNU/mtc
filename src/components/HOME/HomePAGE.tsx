import React from "react";
import "../../App.css";
import SalesPitch from "../SP/salespitch";
import BlackButton from "../../BlackButton1";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileComponent from "../../MobileComponent";
import "../SP/mission.css";
import { Link } from "react-router-dom";
import { auth, mtcgmailuid } from "../../firebase/FirebaseConfig";
import NightModeToggle from "../DEV/NightModeToggle";
interface Props {}

const Home = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <div>{isMobile ? <MobileComponent /> : null}</div>
      <div className="all" style={{ position: "relative" }}>
        <header className="header">
          MUSIC TASTING CLUB{" "}
          {auth.currentUser?.uid === mtcgmailuid && "{PREZ 😎}"}
          <NightModeToggle />
        </header>
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
              <p className="nav-item">
                <BlackButton buttonText="FAQ" />
              </p>
            </Link>

            <Link to={`/club`}>
              <p className="nav-item">
                <BlackButton buttonText="Club" />
              </p>
            </Link>

            <Link to={`/blog`}>
              <p className="nav-item">
                <BlackButton buttonText="Blog" />
              </p>
            </Link>

            <Link to={`/exec`}>
              <p className="nav-item">
                <BlackButton buttonText="Exec" />
              </p>
            </Link>

            {auth.currentUser?.uid === mtcgmailuid && (
              <Link to={"/dev"}>
                <p className="nav-item">
                  <BlackButton buttonText="Dev" />
                </p>
              </Link>
            )}
          </div>
        )}
        <SalesPitch />
      </div>
    </>
  );
};

export default Home;
