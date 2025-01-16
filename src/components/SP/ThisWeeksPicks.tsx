import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./mission.css";
import { Box, useMediaQuery } from "@mui/material";
import picksData from "../WE/picksData.json";
import logo from "../../imgs/MTC_logo.png";
import YsAlbumArt from "../../imgs/manualAlbumArt/WQ24_W2_AotW.png";

export default function ThisWeeksPicks() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const currQuarter = "WQ25";
  const currWeek = "WEEK 2";

  return (
    <div className={isMobile ? "faq2" : "faq"}>
      <h3 style={{ fontSize: 35, textAlign: "center" }}>
        NEXT MEETING'S PICKS (01/21/25)
      </h3>
      <h3
        style={{
          fontSize: 20,
          textAlign: "center",
          marginBottom: 15,
          color: "gray",
        }}
      >
        WE MEET EVERY <span style={{ color: "black" }}>TUESDAY</span> FROM{" "}
        <span style={{ color: "black" }}>6:00-7:15PM</span> IN{" "}
        <span style={{ color: "black" }}>TECH LG52</span>
      </h3>

      {picksData.map((quarter: any, quarterIndex: number) =>
        quarter.weeks
          .filter((week: any) => quarter.quarterName === currQuarter) // Filter quarters
          .filter((week: any) => week.weekName === currWeek) // Filter weeks
          .map((week: any, weekIndex: number) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                marginTop: 0,
                marginBottom: 2,
              }}
            >
              {week.picks.map((pick: any, pickIndex: number) => (
                <div
                  key={`pick-${quarterIndex}-${weekIndex}-${pickIndex}`}
                  className="picks-history"
                >
                  {pick.pickType === "Song of the Week" ? (
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
                  ) : (
                    <div
                      style={{
                        fontWeight: "bold",
                        margin: 10,
                        fontSize: "15px",
                      }}
                    >
                      {pick.pickType}:
                    </div>
                  )}
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
                      style={{
                        fontWeight: "bold",
                        margin: 5,
                        fontSize: 18,
                      }}
                    >
                      {pick.songOrAlbumName !== "N/A" ? (
                        <>{pick.songOrAlbumName}</>
                      ) : (
                        "N/A"
                      )}
                    </div>
                    <div
                      style={{
                        fontWeight: "bold",
                        margin: 5,
                        fontSize: 15,
                      }}
                    >
                      {pick.songOrAlbumName !== "N/A" ? (
                        <>by {pick.artistName}</>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div
                      style={{
                        fontWeight: "bold",
                        margin: 5,
                        fontSize: 12,
                      }}
                    >
                      <br />
                      {pick.songOrAlbumName !== "N/A" ? (
                        <>Picked by {pick.memberName}</>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Box>
          ))
      )}
    </div>
  );
}
