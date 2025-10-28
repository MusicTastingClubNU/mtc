import React from "react";
import spotifyImg from "../../imgs/companyLogos/spotlogo.png";
// import EmailContent from "./EmailTest";
import halloween24PlaylistImg from "../../imgs/spotifyPlaylistCovers/halloween24PlaylistImg.png";
import holidays24PlaylistImg from "../../imgs/spotifyPlaylistCovers/holidays24PlaylistImg.png";
import hipHopWorkoutPlaylistImg from "../../imgs/spotifyPlaylistCovers/hipHopWorkoutPlaylistImg.png";
import logo from "../../imgs/MTCLogo/MTC_logo.png";
import { useMediaQuery } from "@mui/material";
import { fetchSpecialSpotifyPlaylists } from "../../firebase/FirebaseFunctions";
import { useEffect, useState } from "react";
type specialSpotifyPlaylistType = {
  name: string;
  link: string;
  madeBy: string;
};
const ClubPlaylists = () => {
  const playlistImgs = [
    logo,
    logo,
    hipHopWorkoutPlaylistImg,
    halloween24PlaylistImg,
    holidays24PlaylistImg,
    logo,
    logo,
    logo,
    logo,
    logo,
  ];
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [playlists, setPlaylists] = useState<specialSpotifyPlaylistType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSpecialSpotifyPlaylists();
      setPlaylists(data);
    };
    loadData();
  }, []);
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
        <div className="playlist-cont">
          {/* I did the line below bc Typescript is finicky when you're looping through data 
            and you want to show images. I loop through the existing data, and the index of the entry corresponds with the */}
          {playlists.map((playlist, index) => (
            <>
              <div className="special-spotify-playlist" key={index}>
                <a
                  href={playlist.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={playlistImgs[index] ?? logo}
                    alt="Playlist Cover"
                    className="playlist-cover"
                  />
                </a>
                <div className="playlist-text">
                  <div className="playlist-title">{playlist.name}</div>
                  <div className="playlist-author">by {playlist.madeBy}</div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClubPlaylists;
