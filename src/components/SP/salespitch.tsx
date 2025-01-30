import React from "react";
import "./salespitch.css";
import ThisWeeksPicks from "./ThisWeeksPicks";
// import SeeYouNextQuarter from "./SeeYouNextQuarter";
import { useMediaQuery } from "@mui/material";
import "./mission.css";
import SalespitchPanel from "./SalespitchPanel";
import OurMissionPanel from "./OurMissionPanel";
import SignUpPanel from "./SignUpPanel";
interface Props {}

const SalesPitch = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      {isMobile ? <br></br> : null}
      <SalespitchPanel />
      <OurMissionPanel />
      <ThisWeeksPicks />
      {/* <SeeYouNextQuarter /> */}
      <SignUpPanel />
    </>
  );
};

export default SalesPitch;
