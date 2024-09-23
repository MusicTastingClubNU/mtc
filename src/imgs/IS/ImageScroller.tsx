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

  const imagesPerRow = 6;
  const numLines = 6;
  const totalImages = imagesPerRow * numLines;
  const extendedImages = [...images, ...images];
  const lines = [];

  for (let i = 0; i < numLines; i++) {
    const offset = i * imagesPerRow;
    const offsetImages = extendedImages.slice(offset, offset + totalImages);
    lines.push(offsetImages);
  }

  return (
    <div className="logos">
      {lines.map((lineImages, lineIndex) => (
        <div className="logos-slide" key={lineIndex}>
          {lineImages.map((image, imgIndex) => (
            <div key={`line-${lineIndex}-${imgIndex}`} className="logo2">
              {image}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ImageScroller;
