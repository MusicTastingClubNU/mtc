import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Card,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import starterPackData from "./starterPackData.json";
import spotifyImg from "../../imgs/companyLogos/spotlogo.png";
import { useMediaQuery } from "@mui/material";

export default function AccordionList() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <div
        className={isMobile ? "faq2" : "faq"}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2 className="blog-titles" style={{ textAlign: "center" }}>
          MTC Genre Starter Packs{" "}
          <a
            href="https://open.spotify.com/user/31apxxxqaadrj24rjilx75insprq"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={spotifyImg}
              alt="Spotify Img"
              style={{ width: 50, height: 50, marginBottom: -12 }}
            />
          </a>
        </h2>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {starterPackData.map((genre, index) => (
            <Grid
              item
              key={index}
              sx={{
                padding: 2,
                maxWidth: "375px",
                width: "100%",
              }}
            >
              <Card sx={{ width: "100%" }}>
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                      sx={{
                        margin: 0,
                        lineHeight: 0.7,
                        paddingTop: "10px",
                      }}
                    >
                      {genre.genreName}{" "}
                      <span
                        style={{
                          fontSize: "2rem",
                          // marginLeft: "0.3rem",

                          top: "-4px",
                          paddingLeft: "10px",
                          marginTop: "10px",
                          position: "absolute",
                          paddingTop: "12px",
                        }}
                      >
                        {genre?.genreEmoji}
                        {/* TODO: Use Genmoji to make genre-specific emojis */}
                      </span>
                    </Typography>
                    {/* <a
                      href={genre?.spotifyPlaylistLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={spotifyImg}
                        alt="Spotify Logo"
                        style={{
                          width: "50px",
                          textAlign: "right",
                          paddingLeft: 20,
                        }}
                      />
                    </a> */}
                  </AccordionSummary>

                  {genre.recommendations.map((recs) => (
                    <AccordionDetails key={recs.albumName}>
                      <div className="genre-starter-packs">
                        <div>
                          <Typography
                            sx={{
                              margin: 0,
                              lineHeight: 1.2,
                            }}
                          >
                            "{recs.albumName}" by {recs.artistName}
                          </Typography>
                        </div>
                      </div>
                    </AccordionDetails>
                  ))}
                </Accordion>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
