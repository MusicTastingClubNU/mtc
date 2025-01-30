import React, { ReactNode } from "react";
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

// 🔹 Use ReactNode instead of JSX.Element[]
const getSongOrAlbumArtComponents = (): ReactNode => {
  return albumArtLinks.flatMap((quarter) =>
    quarter.weeks.flatMap((week) =>
      week.picks.flatMap((pick) => {
        if (!pick.songOrAlbumArt) return [];
        if (pick.songOrAlbumArt.startsWith("h")) {
          return [
            <img
              key={`quarter-${quarter.quarterId}-week-${week.weekId}-pick-${pick.pickId}`}
              src={pick.songOrAlbumArt}
              alt={pick.songOrAlbumName}
              style={{ width: "100px", height: "100px", margin: "10px" }}
            />,
          ];
        }
        if (pick.songOrAlbumArt.startsWith("Q")) {
          return [manualArtLoader(pick.songOrAlbumArt)];
        }
        return [];
      })
    )
  );
};

function ImageScroller() {
  const images = getSongOrAlbumArtComponents();

  const imagesPerRow = 6;
  const numLines = 6;
  const totalImages = imagesPerRow * numLines;
  const extendedImages = Array.from({ length: 2 }, () => images).flat(); // Optimized duplication
  const lines = Array.from({ length: numLines }, (_, i) =>
    extendedImages.slice(i * imagesPerRow, i * imagesPerRow + totalImages)
  );

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
