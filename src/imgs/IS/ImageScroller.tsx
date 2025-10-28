import React, { ReactNode, useState, useEffect } from "react";
import "./ImageScroller.css";
import albumArtLinks from "../../components/WE/picksData.json";
import { manualArtLoader } from "./ManualImageLoader";
import { db } from "../../firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
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
function ImageScroller() {
  const [images, setImages] = useState<ReactNode[]>([]);
  const [animationReady, setAnimationReady] = useState(false);
  useEffect(() => {
    const fetchArtImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pickData"));
        const allQuarters: Quarter[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data?.weeks?.length) {
            allQuarters.push(data as Quarter);
          }
        });

        allQuarters.sort((a, b) => b.quarterId - a.quarterId);

        const imageComponents: ReactNode[] = allQuarters.flatMap((quarter) =>
          [...quarter.weeks]
            .sort((a, b) => b.weekId - a.weekId)
            .flatMap((week) =>
              [...week.picks].reverse().flatMap((pick) => {
                if (!pick.songOrAlbumArt) return [];

                if (pick.songOrAlbumArt.startsWith("h")) {
                  return (
                    <img
                      key={`q-${quarter.quarterId}-w-${week.weekId}-p-${pick.pickId}`}
                      src={pick.songOrAlbumArt}
                      alt={pick.songOrAlbumName}
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "10px",
                      }}
                    />
                  );
                }
                if (pick.songOrAlbumArt.startsWith("Q")) {
                  return manualArtLoader(pick.songOrAlbumArt);
                }
                return [];
              })
            )
        );
        setImages(imageComponents);
        setAnimationReady(true);
      } catch (err) {
        console.error("Error loading image art from Firestore:", err);
      }
    };

    fetchArtImages();
  }, []);

  const imagesPerRow = 6;
  const numLines = 6;
  const totalImages = imagesPerRow * numLines;
  const extendedImages = Array.from({ length: 2 }, () => images).flat();
  const lines = Array.from({ length: numLines }, (_, i) =>
    extendedImages.slice(i * imagesPerRow, i * imagesPerRow + totalImages)
  );

  return (
    <div className="logos">
      {lines.map((lineImages, lineIndex) => (
        <div
          className={`logos-slide ${animationReady ? "animate" : ""}`}
          key={lineIndex}
        >
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
