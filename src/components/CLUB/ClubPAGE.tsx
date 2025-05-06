import React from "react";
import TitleAndDirectory from "../HOME/TitleAndDirectory";
import { SelectChangeEvent, useMediaQuery } from "@mui/material";
import MyClubSchedule from "./ClubSchedule";
import DateCalendarServerRequest from "./CalendarSched";
import ClubPlaylists from "./ClubPlaylists";
// import StarterPacks from "./StarterPacks";
import MTCAotY from "./MTCAotY";
import PrizeWheel from "../WE/NameWheel";
import { useState } from "react";
import NameWheelData from "../WE/NameWheelData.json";
import MeetTheClubPanel from "./MeetTheClubPanel";
import { auth, mtcgmailuid } from "../../firebase/FirebaseConfig";
// import albums from "../DEV/NameWheelDataFetching";
// import NameWheelDataFetching from "../DEV/NameWheelDataFetching";
interface Props {}

const Activities = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [pick, setPick] = useState("Album of the Week");
  const [wheelOptions, setWheelOptions] = useState<string[]>([]);
  // const { albums, songs, onceThru } = NameWheelDataFetching();

  const [currentPick, setCurrentPick] = React.useState("Album of the Week");
  const handlePickChange = (e: SelectChangeEvent) => {
    setCurrentPick(e.target.value);
  };
  // const handlePickChange = (event: SelectChangeEvent) => {
  //   const selectedPick = event.target.value as string;
  //   setPick(selectedPick);
  // };
  return (
    <>
      <TitleAndDirectory />
      {isMobile ? <br /> : null}
      <MeetTheClubPanel />
      <MyClubSchedule />
      <DateCalendarServerRequest />
      <ClubPlaylists />
      {/* <StarterPacks /> */}
      <MTCAotY />
      <div style={{ marginTop: 40, marginBottom: 40, padding: 0 }}>
        {auth.currentUser?.uid === mtcgmailuid && (
          <PrizeWheel
            title={currentPick}
            // albums={albums}
            // songs={songs}
            // onceThru={onceThru}
            handlePickChange={handlePickChange}
          />
        )}
      </div>
    </>
  );
};

export default Activities;
