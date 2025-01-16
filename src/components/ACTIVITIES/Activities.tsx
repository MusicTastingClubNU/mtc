import React, { useEffect } from "react";
import TitleAndDirectory from "../HOME/TitleAndDirectory";
import { SelectChangeEvent, useMediaQuery } from "@mui/material";
import MyClubSchedule from "../FAQ/ClubSchedule";
import DateCalendarServerRequest from "../FAQ/CalendarSched";
import ClubPlaylists from "./ClubPlaylists";
import StarterPacks from "./StarterPacks";
import MTCAotY from "./MTCAotY";
import PrizeWheel from "../WE/NameWheel";
import { useState } from "react";
import NameWheelData from "../WE/NameWheelData.json";
import picksData from "../WE/picksData.json";
import YsAlbumArt from "../../imgs/manualAlbumArt/WQ24_W2_AotW.png";
import MTCClubPhotoFQ24 from "../../imgs/execBoardImgs/MTC_club_photo_FQ24.png";

interface Props {}

interface Pick {
  pickId: number;
  pickType: string;
  songOrAlbumName: string;
  artistName: string;
  memberName: string;
  songOrAlbumArt: string;
}

const Activities = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [value, setValue] = React.useState(0);
  const [pick, setPick] = useState("Album of the Week");
  const [wheelOptions, setWheelOptions] = useState<string[]>([]);
  const [openRow, setOpenRow] = useState<number | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    let options: string[] = [];
    switch (pick) {
      case "Album of the Week":
        options = NameWheelData["AotW"];
        break;
      case "Runner Up Album of the Week":
        options = NameWheelData["AotW"];
        break;
      case "Song of the Week":
        options = NameWheelData["SotW"];
        break;
      case "Runner Up Song of the Week":
        options = NameWheelData["SotW"];
        break;
      default:
        options = NameWheelData["AotW"];
    }
    setWheelOptions(options);
  }, [pick]);

  const handlePickChange = (event: SelectChangeEvent) => {
    const selectedPick = event.target.value as string;
    setPick(selectedPick);
  };

  const handleRowClick = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };

  const options = picksData.flatMap((quarter) =>
    quarter.weeks.flatMap((week) =>
      week.picks
        .filter((pick) => pick.songOrAlbumName !== "N/A")
        .map((pick) => ({
          songOrAlbumName: pick.songOrAlbumName, // The text displayed in the dropdown
          pickId: pick.pickId,
          artistName: pick.artistName,
          songOrAlbumArt:
            pick.songOrAlbumArt === "Q1W2AotW"
              ? YsAlbumArt
              : pick.songOrAlbumArt,
          memberName: pick.memberName,
          pickType: pick.pickType,
        }))
    )
  );
  return (
    <>
      <TitleAndDirectory />
      {isMobile ? <br /> : null}
      <div className={isMobile ? "faq2" : "faq"}>
        <h2 className="exec-board-title">MEET THE CLUB! (FQ24)</h2>
        <div className="club-photo-container">
          <img
            src={MTCClubPhotoFQ24}
            alt="MTCClubPhotoFQ24"
            style={{ width: "100%", marginTop: 20, borderRadius: 10 }}
          ></img>
          <div style={{ textAlign: "center" }}>
            <h4 style={{ marginTop: 10, marginBottom: -20 }}>FQ24 MEMBERS:</h4>
            <p style={{ marginBottom: -30 }}>
              Arch - Aidan - Andrew - Joseph - Danny
            </p>
            <p style={{ marginBottom: -30 }}>
              Daniel - Reed - Simon - Corey - Susanna - Maya - Cai
            </p>
            <p style={{ marginBottom: -30 }}>
              Not Pictured: Grace - Ryan - AJ - Acton - Zoey
            </p>
            <p style={{ marginBottom: -10 }}>
              Photography by{" "}
              <a
                href={"https://www.jelkphoto.com/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Jonah Elkowitz
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className={isMobile ? "faq2" : "faq"}>
        <h2 style={{ fontSize: 35, textAlign: "center", marginBottom: 15 }}>
          Club Schedule
        </h2>
        <MyClubSchedule />
      </div>
      <div className={isMobile ? "faq2" : "faq"}>
        <h2 style={{ fontSize: 35, textAlign: "center", marginBottom: 15 }}>
          Calendar
        </h2>
        <br />
        <DateCalendarServerRequest />
      </div>
      {/* ||| CLUB PLAYLISTS COMPONENT ||| */}
      <ClubPlaylists />
      {/* ||| STARTER PACKS COMPONENT ||| */}
      <StarterPacks />
      {/* ||| MTC Album Of The Year ||| */}
      {/* <MTCAotY year={2024} /> */}
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
