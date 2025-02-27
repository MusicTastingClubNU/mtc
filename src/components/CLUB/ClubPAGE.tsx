import React, { useEffect } from "react";
import TitleAndDirectory from "../HOME/TitleAndDirectory";
import { SelectChangeEvent, useMediaQuery } from "@mui/material";
import MyClubSchedule from "./ClubSchedule";
import DateCalendarServerRequest from "./CalendarSched";
import ClubPlaylists from "./ClubPlaylists";
import StarterPacks from "./StarterPacks";
import MTCAotY from "./MTCAotY";
import PrizeWheel from "../WE/NameWheel";
import { useState } from "react";
import NameWheelData from "../WE/NameWheelData.json";
import picksData from "../WE/picksData.json";
import YsAlbumArt from "../../imgs/manualAlbumArt/WQ24_W2_AotW.png";
import MeetTheClubPanel from "./MeetTheClubPanel";

interface Props {}

const Activities = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [pick, setPick] = useState("Album of the Week");
  const [wheelOptions, setWheelOptions] = useState<string[]>([]);

  const handlePickChange = (event: SelectChangeEvent) => {
    const selectedPick = event.target.value as string;
    setPick(selectedPick);
  };
  return (
    <>
      <TitleAndDirectory />
      {isMobile ? <br /> : null}
      <MeetTheClubPanel />
      <MyClubSchedule />
      <DateCalendarServerRequest />
      <ClubPlaylists />
      <StarterPacks />
      <MTCAotY />
      <div style={{ marginTop: 40, marginBottom: 40, padding: 0 }}>
        {isMobile ? null : (
          <PrizeWheel
            options={wheelOptions}
            title={pick}
            handlePickChange={handlePickChange}
            nameWheelDataToBeCopied={NameWheelData}
          />
        )}
      </div>
    </>
  );
};

export default Activities;
