import React from "react";
import "../SP/mission.css";
// import myimg from "../../imgs/logo.png";
import { useMediaQuery } from "@mui/material";
import TitleAndDirectory from "../HOME/TitleAndDirectory";
import AndrewWatsonImg from "../../imgs/execBoardImgs/AndrewWatson.png";
import ArchieSilversteinImg from "../../imgs/execBoardImgs/ArchieSilverstein.png";
import DannyRamirezImg from "../../imgs/execBoardImgs/DannyRamirez.png";
import ReedMalcomImg from "../../imgs/execBoardImgs/ReedMalcom.png";
// import SusannaBobsImg from "../../imgs/execBoardImgs/SusannaBobbs.png";
import SimonOlshanCantinImg from "../../imgs/execBoardImgs/SimonOlshanCantin.png";
import AndrewBarrettImg from "../../imgs/execBoardImgs/AndrewBarrett.png";
import CoreyDubinImg from "../../imgs/execBoardImgs/CoreyDubin.png";
import DanielRiveroImg from "../../imgs/execBoardImgs/DanielRivero.png";
import AidanMottImg from "../../imgs/execBoardImgs/AidanMott.png";
import MTCClubPhotoFQ24 from "../../imgs/execBoardImgs/MTC_club_photo_FQ24.png";

interface Props {}

const execBoardList: Array<[string, string, string, any]> = [
  [
    "Arch Silverstein",
    "President/Founder",
    "Leads weekly meetings, makes weekly slides",
    ArchieSilversteinImg,
  ],
  [
    "Daniel Rivero",
    "Vice President",
    "Makes weekly slides, leads every 4th meeting",
    DanielRiveroImg,
  ],
  ["Andrew Watson", "Treasurer", "In charge of the finances", AndrewWatsonImg],
  [
    "Reed Malcolm",
    "DJ",
    "Controls music during meetings, makes weekly playlists",
    ReedMalcomImg,
  ],
  [
    "Danny Ramirez",
    "Social Media Chair",
    "Posts to our social media platforms",
    DannyRamirezImg,
  ],
  [
    "Corey Dubin",
    "Print Media Chair",
    "Writes for the MTC Blog, sends out the listservs",
    CoreyDubinImg,
  ],
  [
    "Simon Olshan-Cantin",
    "In-Club Activity Chair",
    "Coordinates in-club activities (games/presentations)",
    SimonOlshanCantinImg,
  ],
  [
    "Aidan Mott",
    "Event Planning Chair",
    "Plans club trips and events",
    AidanMottImg,
  ],
  ["Andrew Barrett", "Faculty Advisor", "", AndrewBarrettImg],
];
const ExecBoard = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <React.Fragment>
      <TitleAndDirectory />
      {isMobile ? <br></br> : null}
      <div className="ebc">
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
      <div className="ebc">
        <h2 className="exec-board-title">MEET THE EXEC BOARD!</h2>
        <div className="exec-board-container">
          {execBoardList.map((item, index) => (
            <div key={index} className="exec-board-item">
              <img
                src={item[3]}
                alt="profile_pic"
                className="exec-board-img"
              ></img>
              <h2>{item[0]}</h2>
              <h3>{item[1]}</h3>
              <h5>{item[2]}</h5>
            </div>
          ))}
        </div>
      </div>

      <br />
    </React.Fragment>
  );
};
export default ExecBoard;
