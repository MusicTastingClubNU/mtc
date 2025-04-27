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
    "Daniel Rivero",
    "President",
    "Leads meetings, makes weekly admin slides, updates website",
    DanielRiveroImg,
    "'Dove' by Pillar Point",
  ],
  [
    "Simon Olshan-Cantin",
    "Vice President & Event Planning Co-Chair",
    "Makes weekly pick slides, leads every 4th meeting, helps with events",
    SimonOlshanCantinImg,
    "",
  ],
  [
    "Danny Ramirez",
    "Treasurer",
    "In charge of the finances",
    DannyRamirezImg,
    '"How to Disappear Completely" by Radiohead',
  ],
  [
    "Corey Dubin",
    "Media Chair",
    "Posts to our social media platforms, sends out weekly emails",
    CoreyDubinImg,
    "'Rio' by Duran Duran",
  ],
  [
    "Katie Partee",
    "In-Club Activity Chair & Event Planning Co-Chair",
    "Coordinates in-club activities (games/presentations), helps with events",
    logo,
    "",
  ],
  [
    "Ryan Murphy",
    "Vibe Chair",
    "He makes sure the vibes are right 😎",
    RyanMurphyImg,
    "'Just Like Heaven' by The Cure",
  ],
  ["Andrew Barrett", "Faculty Advisor", "", AndrewBarrettImg, ""],
  [
    "Arch Silverstein",
    "Founder",
    "Founded MTC, built the website, gone but not forgotten ❤️",
    ArchieSilversteinImg,
    "",
  ],
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
              <h3 style={{ paddingBottom: 10 }}>{item[1]}</h3>
              <h4 style={{ paddingBottom: 10 }}>{item[2]}</h4>
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
