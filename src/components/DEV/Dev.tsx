import React, { useState } from "react";
import TitleAndDirectory from "../HOME/TitleAndDirectory";
import {
  Box,
  Button,
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

export const DevPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [devPick, setDevPick] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setDevPick(event.target.value as string);
  };

  const [devTitle, setDevTitle] = React.useState("");
  const handleSearchChange = (event: any) => {
    setDevTitle(event.target.value);
  };

  const [searchButtonPressed, setSearchButtonPressed] = useState(false);
  const handleSearchButtonPressed = () => {
    setSearchButtonPressed(!searchButtonPressed);
  };

  return (
    <>
      <TitleAndDirectory />
      {isMobile ? <br /> : null}
      <div className={isMobile ? "faq2" : "faq"} style={{ marginBottom: 40 }}>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Age</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={devPick}
              label="Pick"
              onChange={handleChange}
            >
              <MenuItem value={""}></MenuItem>
              <MenuItem value={"ALBUM"}>Album</MenuItem>
              <MenuItem value={"SONG"}>Song</MenuItem>
            </Select>
          </FormControl>

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
            sx={{ width: 250, m: 1 }}
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
      {searchButtonPressed && devPick != "" ? (
        <div
          className={isMobile ? "faq2" : "faq"}
          style={{ textAlign: "center" }}
        >
          <h4>{devPick} ART (Courtesy of the Spotify API)</h4>
          <div className="dev-album-or-song-art-cont"></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
