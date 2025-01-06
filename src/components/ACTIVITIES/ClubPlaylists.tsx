import React from "react";

import specialSpotifyPlaylistData from "./specialSpotifyPlaylists.json";
import spotifyImg from "../../imgs/companyLogos/spotlogo.png";
// import EmailContent from "./EmailTest";
import halloween24PlaylistImg from "../../imgs/spotifyPlaylistCovers/halloween24PlaylistImg.png";
import holidays24PlaylistImg from "../../imgs/spotifyPlaylistCovers/holidays24PlaylistImg.png";
import hipHopWorkoutPlaylistImg from "../../imgs/spotifyPlaylistCovers/hipHopWorkoutPlaylistImg.png";
import logo from "../../imgs/MTC_logo.png";
import { useMediaQuery } from "@mui/material";
const ClubPlaylists = () => {
  const playlistImgs = [
    logo,
    logo,
    hipHopWorkoutPlaylistImg,
    halloween24PlaylistImg,
    holidays24PlaylistImg,
  ];
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <div className={isMobile ? "faq2" : "faq"}>
        <h2 className="blog-titles">
          Club Playlists{" "}
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
        <div className="spotify-cont">
          {/* I did the line below bc Typescript is finicky when you're looping through data 
            and you want to show images. I loop through the existing data, and the index of the entry corresponds with the */}
          {Object.entries(specialSpotifyPlaylistData).map(
            ([key, value], index) => (
              <div className="spotify-playlists">
                <a href={value.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={playlistImgs[index]}
                    alt="Playlist Photo"
                    className="company-logos"
                    style={{
                      borderRadius: 10,
                      width: 125,
                      height: 125,
                      marginBottom: -10,
                    }}
                  />
                </a>

                <div style={{ padding: 10 }}>{value.name}</div>
                <div>Made By {value.madeBy}</div>
                <a href={value.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={spotifyImg}
                    alt="Spotify Logo"
                    className="company-logos"
                    style={{ width: 50, height: 50 }}
                  />
                </a>
                <br />
              </div>
            )
          )}
        </div>
      </div>
      <br /> <br />
    </>
  );
};

export default ClubPlaylists;
