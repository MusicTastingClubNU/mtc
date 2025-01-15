import React from "react";
import "./salespitch.css";
import ThisWeeksPicks from "./ThisWeeksPicks";
// import SeeYouNextQuarter from "./SeeYouNextQuarter";
import ConditionalPhoneSignUp from "./ConditionalPhoneSignUp";
import { useMediaQuery } from "@mui/material";
import "./mission.css";
import img from "../../imgs/MTC_logo.png";
interface Props {}

const SalesPitch = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {isMobile ? <br></br> : null}
      <div className={isMobile ? "cont2" : "cont"}>
        <div className="my-centered-text">
          <h2>DO YOU LIKE LISTENING TO/TALKING ABOUT/TRYING OUT NEW MUSIC?</h2>
          <h1>THE MUSIC TASTING CLUB IS THE PLACE FOR YOU!</h1>
          <h3>Imagine a weekly book club, but for albums/songs.</h3>
        </div>
      </div>
      <div className={isMobile ? "mission-cont2" : "mission-cont"}>
        <div className="mission">
          <h1>OUR MISSION:</h1>
          <h3>
            To have members discover new music and to build community through
            shared passion and discussion.
          </h3>
        </div>
        <div style={{ textAlign: "center" }}>
          <img src={img} alt="logo img" className="mission-img"></img>
          <p className="thingghost-insta-link">
            Logo by{" "}
            <a
              href="https://www.instagram.com/itsuhkat/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @itsuhkat
            </a>
          </p>
        </div>
      </div>
      <ThisWeeksPicks />
      <br /> <br />
      {/* <SeeYouNextQuarter /> */}
      {/* {isMobile ? <ConditionalPhoneSignUp /> : <br />} */}
      <ConditionalPhoneSignUp />
    </>
  );
};

export default SalesPitch;
