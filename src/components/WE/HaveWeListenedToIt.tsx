import { Autocomplete, TextField, useMediaQuery } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import YsAlbumArt from "../../imgs/manualAlbumArt/WQ24_W2_AotW.png";
import picksData from "./picksData.json";

export default function HaveWeListenedToIt() {
  interface Pick {
    pickId: number;
    pickType: string;
    songOrAlbumName: string;
    artistName: string;
    memberName: string;
    songOrAlbumArt: string;
  }

  const [selectedOpt, setSelectedOpt] = useState<Pick | null>(null);
  const [haveWeListenedToIt, setHaveWeListenedToIt] = useState("");
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    setInputValue(value);
  };
  const handleChange2 = (event: React.ChangeEvent<{}>, value: Pick | null) => {
    setSelectedOpt(value);
    if (value) {
      setHaveWeListenedToIt("YES");
    } else if (inputValue === undefined) {
      setHaveWeListenedToIt("");
    } else {
      setHaveWeListenedToIt("");
    }
  };
  const [colorOfHWLToIt, setColorOfHWLToIt] = useState("");
  useEffect(() => {
    if (haveWeListenedToIt === "YES") {
      setColorOfHWLToIt("green");
    } else {
      setColorOfHWLToIt("");
    }
  }, [haveWeListenedToIt]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const options = picksData.flatMap((quarter) =>
    quarter.weeks.flatMap((week) =>
      week.picks
        .filter((pick) => pick.songOrAlbumName !== "N/A")
        .map((pick) => ({
          songOrAlbumName: pick.songOrAlbumName, // The text displayed in the dropdown
          pickId: pick.pickId,
          artistName: pick.artistName,
          songOrAlbumArt:
            pick.songOrAlbumArt === "Q1W2AotW"
              ? YsAlbumArt
              : pick.songOrAlbumArt,
          memberName: pick.memberName,
          pickType: pick.pickType,
        }))
    )
  );
  return (
    <div className={isMobile ? "cont2" : "cont"}>
      <h3 style={{ fontSize: 35, textAlign: "center" }}>
        Have We Listened To It Yet?{" "}
        <span style={{ color: colorOfHWLToIt }}>{haveWeListenedToIt}</span>
      </h3>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{
          width: "100%",
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 2,
          marginBottom: 1,
        }}
        onChange={handleChange2}
        onInputChange={handleInputChange}
        getOptionLabel={(option) =>
          `${option.songOrAlbumName} - ${option.artistName} [${option.pickType}]`
        }
        renderInput={(params) => <TextField {...params} label="Search Bar" />}
        renderOption={(props, option) => (
          <li {...props}>
            <img
              src={option.songOrAlbumArt}
              alt={option.songOrAlbumName}
              style={{ width: 50, marginRight: 10 }}
            />
            {option.songOrAlbumName} - {option.artistName} [
            {option.pickType.length === 17
              ? "Album"
              : option.pickType.length === 27
              ? "Album"
              : option.pickType.length === 16
              ? "Song"
              : option.pickType.length === 26
              ? "Song"
              : ""}
            ]
          </li>
        )}
        noOptionsText="Hmm...looks like we haven't listed to this yet..."
      />
    </div>
  );
}
