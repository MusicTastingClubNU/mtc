import React from "react";
import "./ImageScroller.css";
import albumArtLinks from "../../components/WE/picksData.json";
import { manualArtLoader } from "./ManualImageLoader";

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
        if (pick.songOrAlbumArt) {
          if (pick.songOrAlbumArt[0] === "h") {
            imageComponents.push(
              <img
                key={`quarter-${quarter.quarterId}-week-${week.weekId}-pick-${pick.pickId}`}
                src={pick.songOrAlbumArt}
                alt={pick.songOrAlbumName}
                style={{ width: "100px", height: "100px", margin: "10px" }}
              />
            );
          }
          if (pick.songOrAlbumArt[0] === "Q") {
            imageComponents.push(manualArtLoader(pick.songOrAlbumArt));
          }
        }
      });
    });
  });

  return imageComponents;
};

function ImageScroller() {
  const images = getSongOrAlbumArtComponents();

  // Extend the images array for continuous scrolling
  const extendedImages = [...images, ...images];

  return (
    <div className="logos">
      <div className="logos-slide">
        {extendedImages.map((image, imgIndex) => (
          <div key={`image-${imgIndex}`} className="logo2">
            {image}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageScroller;
