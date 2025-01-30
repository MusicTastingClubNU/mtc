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
          MTC Genre Starter Packs
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
                      }}
                    >
                      {genre.genreName}{" "}
                      <span
                        style={{
                          fontSize: "2rem",
                          marginLeft: "0.3rem",
                        }}
                      >
                        {/* TODO: Use Genmoji to make genre-specific emojis */}
                        {genre?.genreEmoji}
                      </span>
                    </Typography>
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
                        <a
                          href={recs.spotifyAlbumLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={spotifyImg}
                            alt="Spotify Logo"
                            className="spotify-logo"
                          />
                        </a>
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
