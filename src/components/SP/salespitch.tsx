import React from "react";
import "./salespitch.css";
import ThisWeeksPicks from "./ThisWeeksPicks";
import SeeYouNextQuarter from "./SeeYouNextQuarter";
import { useMediaQuery } from "@mui/material";
import "./mission.css";
import SalespitchPanel from "./SalespitchPanel";
import OurMissionPanel from "./OurMissionPanel";
import SignUpPanel from "./SignUpPanel";
import { useRoomDayTime } from "../DEV/hooks/useRoomDateTime";
interface Props {}

const SalesPitch = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { roomDayTime, error, loading } = useRoomDayTime();
  return (
    <>
      {isMobile ? <br></br> : null}
      <SalespitchPanel />
      <OurMissionPanel />
      {!loading && roomDayTime?.onBreak ? (
        <SeeYouNextQuarter />
      ) : (
        <ThisWeeksPicks />
      )}

      <SignUpPanel />
    </>
  );
};

export default SalesPitch;
