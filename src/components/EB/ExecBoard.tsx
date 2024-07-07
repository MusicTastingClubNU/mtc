import React from 'react';
import '../SP/mission.css';
import myimg from "../../imgs/logo.png";
import { useMediaQuery } from '@mui/material';

const execBoardList:Array<[string,string,string,any]> = [
    ["Arch Silverstein", "President", "Leads weekly meetings, makes weekly slides", myimg],
    ["Daniel Rivero", "Vice President", "Makes weekly slides, leads every 4th meeting",myimg],
    ["Andrew Watson", "Treasurer", "Is in charge of the finances, Deals with SOFO",myimg],
    ["Reed Malcolm", "DJ", "Controls music during meetings, makes weekly playlists", myimg],
    ['Danny Ramirez', "Social Media Chair", "Posts to our social media platforms",myimg],
    ["Corey Dubin","Print Media Chair","Writes for the MTC Blog, Send out the listservs", myimg],
    ["Simon Olshan-Cantin","In-Club Activity Chair","Coordinates in-club activities (games/presentations)",myimg],
    ["Susanna Bobbs","Event Planning Chair","Plans trips and album-listening parties",myimg]
];

export default function ExecBoard() {
    const isMobile =  useMediaQuery('(max-width: 768px)');
    return (
        <React.Fragment>
        {isMobile ? (<br></br>) : null} 
        <div className="ebc">
            <h2 className="exec-board-title">MEET THE EXEC BOARD!</h2>
                        <div className="exec-board-container">
            {execBoardList.map((item,index) => (
              <div key={index} className="exec-board-item">
                <img src={item[3]} alt="profile_pic" className="exec-board-img"></img>
                <h2>{item[0]}</h2>
                <h3>{item[1]}</h3>
                <h5>{item[2]}</h5>
            </div>   
            ))}
        </div>
        </div>
        </React.Fragment>
    );
  }