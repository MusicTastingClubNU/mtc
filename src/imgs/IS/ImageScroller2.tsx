import React from "react";
import "./ImageScroller2.css";
import albumArtLinks from "../../components/WE/picksData.json";
//Q1W2AotW Q1W3RUSotW Q1W9RUSotW Q2W2SotW
interface Pick {
  pickId: number;
  pickType: string;
  songOrAlbumName: string;
  artistName: string;
  memberName: string;
  songOrAlbumArt: string;
}

interface Week {
  weekId: number;
  weekName: string;
  weekDate: string;
  weekActivity: {
    weekActivityEmoji: string;
    weekActivityTitle: string;
    weekActivityDetails: string;
    weekActivityHost: string;
  };
  weekActivityEmoji: string;
  picks: Pick[];
}

interface Quarter {
  quarterId: number;
  quarterName: string;
  weeks: Week[];
}

const getSongOrAlbumArtComponents = () => {
  const imageComponents: JSX.Element[] = [];

  albumArtLinks.forEach((quarter) => {
    quarter.weeks.forEach((week) => {
      week.picks.forEach((pick) => {
        if (
          pick.songOrAlbumArt &&
          pick.songOrAlbumArt.toString() !== "NEED TO FIND" &&
          pick.songOrAlbumArt.toString() !== "MANUAL"
        ) {
          imageComponents.push(
            <img
              key={`quarter-${quarter.quarterId}-week-${week.weekId}-pick-${pick.pickId}`}
              src={pick.songOrAlbumArt}
              alt={pick.songOrAlbumName}
              style={{ width: "200px", height: "200px", margin: "10px" }}
            />
          );
        }
      });
    });
  });
  return imageComponents;
};

function ImageScroller() {
  const images = getSongOrAlbumArtComponents();
  return (
    <div className="slider">
      <div className="slide-track">
        {images.map((img, ind) => (
          <div className="slide" key={ind}>
            {img}
          </div>
        ))}
        {images.map((img, ind) => (
          <div className="slide" key={ind}>
            {img}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageScroller;
