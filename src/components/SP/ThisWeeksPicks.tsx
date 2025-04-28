import * as React from "react";
import "./mission.css";
import { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import logo from "../../imgs/MTCLogo/MTC_logo.png";
import YsAlbumArt from "../../imgs/manualAlbumArt/WQ24_W2_AotW.png";
import { db } from "../../firebase/FirebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import spotifyImg from "../../imgs/companyLogos/spotlogo.png";
export default function ThisWeeksPicks() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const meetingDay = "THURSDAY";
  const meetingTime = "6:00-7:15";
  const meetingLocation = "KRESGE 2440";

  const [latestWeek, setLatestWeek] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestWeekData = async () => {
      try {
        // Step 1: Get all quarter docs
        const querySnapshot = await getDocs(collection(db, "pickData"));
        const allQuarters: any[] = [];
        querySnapshot.forEach((docSnap) => {
          allQuarters.push({ ...docSnap.data(), docId: docSnap.id });
        });

        // Step 2: Find quarter with highest quarterId
        const latestQuarter = allQuarters.sort(
          (a, b) => b.quarterId - a.quarterId
        )[0];

        if (!latestQuarter || !latestQuarter.docId) return;

        // Step 3: Get full doc (to be safe if it's partial)
        const docRef = doc(db, "pickData", latestQuarter.docId);
        const fullDoc = await getDoc(docRef);
        if (!fullDoc.exists()) return;

        const fullData = fullDoc.data();

        // Step 4: Find week with highest weekId
        const latestWeekData = fullData.weeks.sort(
          (a: any, b: any) => b.weekId - a.weekId
        )[0];

        setLatestWeek(latestWeekData);
      } catch (err) {
        console.error("Error fetching latest week:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestWeekData();
  }, []);

  if (loading || !latestWeek) return null;

  return (
    <div className={isMobile ? "faq2" : "faq"}>
      <h3 style={{ fontSize: 35, textAlign: "center" }}>
        NEXT MEETING'S PICKS {latestWeek.weekDate}{" "}
        <a
          href={latestWeek.spotifyPlaylistLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={spotifyImg}
            alt="Spotify Img"
            style={{
              width: 50,
              height: 50,
              marginBottom: -12,
              marginLeft: isMobile ? 0 : 10,
            }}
          />
        </a>
      </h3>
      <div className="this-weeks-picks">
        <h3>
          WE MEET EVERY <span style={{ color: "black" }}>{meetingDay}</span>{" "}
          FROM <span style={{ color: "black" }}>{meetingTime}</span> IN{" "}
          <span style={{ color: "black" }}>{meetingLocation}</span>
        </h3>
      </div>
      <Box className="box-container">
        {latestWeek.picks.map((pick: any, pickIndex: number) => (
          <div
            key={`pick-${pickIndex}`}
            className={isMobile ? "picks-history-mobile" : "picks-history"}
          >
            <div
              style={{
                fontWeight: "bold",
                marginBottom: pick.pickType === "Song of the Week" ? 58 : 34,
                marginTop: 10,
                fontSize: "15px",
                padding: 5,
              }}
            >
              {pick.pickType}:
            </div>
            <div>
              <img
                src={
                  pick.songOrAlbumArt === "Q1W2AotW"
                    ? YsAlbumArt
                    : pick.songOrAlbumArt === ""
                    ? logo
                    : pick.songOrAlbumArt
                }
                alt="albumOrSongArt"
                style={{ width: "90%", borderRadius: 10 }}
              />
              <div style={{ fontWeight: "bold", margin: 5, fontSize: 18 }}>
                {pick.songOrAlbumName !== "N/A" ? pick.songOrAlbumName : "N/A"}
              </div>
              <div style={{ fontWeight: "bold", margin: 5, fontSize: 15 }}>
                {pick.songOrAlbumName !== "N/A" && <>by {pick.artistName}</>}
              </div>
              <div style={{ fontWeight: "bold", margin: 5, fontSize: 12 }}>
                <br />
                {pick.songOrAlbumName !== "N/A" && (
                  <>Picked by {pick.memberName}</>
                )}
              </div>
            </div>
          </div>
        ))}
      </Box>
    </div>
  );
}
