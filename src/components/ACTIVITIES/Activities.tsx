import React from "react";
import TitleAndDirectory from "../HOME/TitleAndDirectory";
import { useMediaQuery } from "@mui/material";
import MyClubSchedule from "../FAQ/ClubSchedule";
import DateCalendarServerRequest from "../FAQ/CalendarSched";
import ClubPlaylists from "./ClubPlaylists";
import StarterPacks from "./StarterPacks";
import MTCAotY from "./MTCAotY";

interface Props {}

const Activities = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <TitleAndDirectory />
      {isMobile ? <br /> : null}
      <div className={isMobile ? "faq2" : "faq"}>
        <h2 style={{ fontSize: 35, textAlign: "center", marginBottom: 15 }}>
          Calendar
        </h2>
        <br />
        <DateCalendarServerRequest />
      </div>
      <br /> <br />
      <div className={isMobile ? "faq2" : "faq"}>
        <h2 style={{ fontSize: 35, textAlign: "center", marginBottom: 15 }}>
          Club Schedule
        </h2>
        <MyClubSchedule />
      </div>
      <br />
      <br />
      {/* ||| CLUB PLAYLISTS COMPONENT ||| */}
      <ClubPlaylists />
      {/* ||| STARTER PACKS COMPONENT ||| */}
      <StarterPacks />
      {/* ||| MTC Album Of The Year ||| */}
      {/* <MTCAotY year={2024} /> */}
      <MTCAotY />
    </>
  );
};

export default Activities;
