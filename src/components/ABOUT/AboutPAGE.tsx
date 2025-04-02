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
import RyanMurphyImg from "../../imgs/execBoardImgs/RyanMurphy.png";
import logo from "../../imgs/MTCLogo/MTC_logo.png";
import Login from "../../firebase/Login";

interface Props {}

const execBoardList: Array<[string, string, string, any, string]> = [
  [
    "Arch Silverstein",
    "President/Founder",
    "Leads meetings, makes weekly admin slides, updates website",
    ArchieSilversteinImg,
    '"Paul Rodriguez" by LOGIC',
  ],
  [
    "Daniel Rivero",
    "Vice President",
    "Makes weekly pick slides, leads every 4th meeting",
    DanielRiveroImg,
    "",
  ],
  [
    "Andrew Watson",
    "Treasurer",
    "In charge of the finances",
    AndrewWatsonImg,
    "",
  ],
  [
    "Reed Malcolm",
    "DJ",
    "Controls music during meetings, makes weekly playlists",
    ReedMalcomImg,
    "",
  ],
  [
    "Danny Ramirez",
    "Social Media Chair",
    "Posts to our social media platforms",
    DannyRamirezImg,
    '"How to Disappear Completely" by Radiohead',
  ],
  [
    "Corey Dubin",
    "Print Media Chair",
    "Writes for the MTC Blog, sends out the listservs",
    CoreyDubinImg,
    "",
  ],
  [
    "Simon Olshan-Cantin",
    "In-Club Activity Chair",
    "Coordinates in-club activities (games/presentations)",
    SimonOlshanCantinImg,
    "",
  ],

  [
    "Aidan Mott",
    "Event Planning Chair",
    "Plans club trips and events",
    AidanMottImg,
    '"Orange Juice" by Noah Kahan',
  ],
  [
    "Ryan Murphy",
    "Vibe Chair",
    "He makes sure the vibes are right",
    RyanMurphyImg,
    "",
  ],
  ["Andrew Barrett", "Faculty Advisor", "", AndrewBarrettImg, ""],
];
const ExecBoard = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <React.Fragment>
      <TitleAndDirectory />
      {isMobile ? <br></br> : null}

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
              <h4>{item[2]}</h4>
              {item[4] && (
                <h5 style={{ marginTop: 7 }}>Favorite Song: {item[4]}</h5>
              )}
              {item[1].includes("President") && !item[1].includes("Vice") && (
                <Login />
              )}
            </div>
          ))}
        </div>
      </div>

      <br />
    </React.Fragment>
  );
};
export default ExecBoard;
