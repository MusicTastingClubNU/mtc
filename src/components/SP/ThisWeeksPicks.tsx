import * as React from "react";
import "./mission.css";
import { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import logo from "../../imgs/MTCLogo/MTC_logo.png";
import YsAlbumArt from "../../imgs/manualAlbumArt/WQ24_W2_AotW.png";
import { db } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
export default function ThisWeeksPicks() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const currQuarter = "SQ25"; // The doc ID
  const currWeek = "WEEK 4";

  const meetingDay = "THURSDAY";
  const meetingTime = "6:00-7:15";
  const meetingLocation = "KRESGE 2440";

  const [quarterData, setQuarterData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuarterData = async () => {
      try {
        const docRef = doc(db, "pickData", currQuarter);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setQuarterData(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching quarter data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuarterData();
  }, [currQuarter]);

  if (loading) return <div>Loading...</div>;
  if (!quarterData) return <div>No data found for {currQuarter}</div>;
  return (
    <div className={isMobile ? "faq2" : "faq"}>
      {quarterData.weeks
        .filter((week: any) => week.weekName === currWeek)
        .map((week: any, weekIndex: number) => (
          <>
            <h3 style={{ fontSize: 35, textAlign: "center" }}>
              NEXT MEETING'S PICKS {week.weekDate}
            </h3>
            <div className="this-weeks-picks">
              <h3>
                WE MEET EVERY{" "}
                <span style={{ color: "black" }}>{meetingDay}</span> FROM{" "}
                <span style={{ color: "black" }}>{meetingTime}</span> IN{" "}
                <span style={{ color: "black" }}>{meetingLocation}</span>
              </h3>
            </div>
            <Box className="box-container">
              {week.picks.map((pick: any, pickIndex: number) => (
                <div
                  key={`pick-${currQuarter}-${weekIndex}-${pickIndex}`}
                  className={
                    isMobile ? "picks-history-mobile" : "picks-history"
                  }
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      marginBottom: 34,
                      marginTop: 10,
                      fontSize: "15px",
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
                    <div
                      style={{ fontWeight: "bold", margin: 5, fontSize: 18 }}
                    >
                      {pick.songOrAlbumName !== "N/A"
                        ? pick.songOrAlbumName
                        : "N/A"}
                    </div>
                    <div
                      style={{ fontWeight: "bold", margin: 5, fontSize: 15 }}
                    >
                      {pick.songOrAlbumName !== "N/A" && (
                        <>by {pick.artistName}</>
                      )}
                    </div>
                    <div
                      style={{ fontWeight: "bold", margin: 5, fontSize: 12 }}
                    >
                      <br />
                      {pick.songOrAlbumName !== "N/A" && (
                        <>Picked by {pick.memberName}</>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Box>
          </>
        ))}
    </div>
  );
}
