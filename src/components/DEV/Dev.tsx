import React, { useState, useEffect, useCallback } from "react";
import TitleAndDirectory from "../HOME/TitleAndDirectory";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  useMediaQuery,
} from "@mui/material";
import "../../App.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Search } from "@mui/icons-material";
import BlackButton from "../../BlackButton1";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type CacheType = {
  [key: string]: string[];
};

export const DevPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [searchButtonPressed, setSearchButtonPressed] = useState(false);
  const handleSearchButtonPressed = () => {
    if (devTitle !== "") fetchAlbumImageUrls();
  };

  const [accessToken, setAccessToken] = useState("");
  const [mylist, setMylist] = useState<string[]>([]);
  const [devTitle, setDevTitle] = useState("");

  const [cache, setCache] = useState<CacheType>({});

  useEffect(() => {
    const fetchAccessToken = async () => {
      const authParameters = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
      };
      try {
        const res = await fetch(
          "https://accounts.spotify.com/api/token",
          authParameters
        );
        const data = await res.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    fetchAccessToken();
  }, []);

  const handleCopyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  const fetchAlbumImageUrls = useCallback(async () => {
    const cacheKey = `AlbumOrSong-${devTitle}`;
    if (cache[cacheKey]) {
      setMylist(cache[cacheKey]);
      return;
    }
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=artist:${devTitle}&type=album`,
        searchParameters
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      const newMylist = data.albums.items.map(
        (album: any) => album.images[0].url
      );
      setMylist(newMylist);
      setCache((prevCache) => ({ ...prevCache, [cacheKey]: newMylist }));
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  }, [accessToken, devTitle, cache]);

  const handleSearchChange = (event: any) => {
    setDevTitle(event.target.value);
  };

  return (
    <>
      <TitleAndDirectory />
      {isMobile ? <br /> : null}
      <div className={isMobile ? "faq2" : "faq"} style={{ marginBottom: 40 }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          AlbumOrSongArt (Courtesy of the Spotify API)
        </h2>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={devTitle}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300, m: 1 }}
            size="small"
          />

          <div style={{ margin: 1 }}>
            <BlackButton
              buttonText={"SEARCH"}
              marg={1}
              high={40}
              onClick={handleSearchButtonPressed}
            />
          </div>
        </div>
      </div>
      {mylist ? (
        <>
          {mylist ? (
            <div
              className={isMobile ? "faq2" : "faq"}
              style={{ marginBottom: 40 }}
            >
              <div className="dev-album-or-song-art-cont">
                <br />
                {mylist.map((url, index) => (
                  <div className="dev-album-or-song-art-item">
                    <img
                      key={index}
                      src={url}
                      alt={`Art ${index}`}
                      width={100}
                      height={100}
                    />
                    <IconButton
                      onClick={() => handleCopyToClipboard(url)}
                      sx={{ color: "lightgray" }}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      {/* <div className={isMobile ? "faq2" : "faq"} style={{ marginBottom: 40 }}>
        <Box sx={{ backgroundColor: "black", width: 100, height: 100 }}></Box>
      </div> */}
    </>
  );
};

export default DevPage;
