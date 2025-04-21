import { Autocomplete, TextField, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/FirebaseConfig";
import YsAlbumArt from "../../imgs/manualAlbumArt/WQ24_W2_AotW.png";

interface Pick {
  pickId: number;
  pickType: string;
  songOrAlbumName: string;
  artistName: string;
  memberName: string;
  songOrAlbumArt: string;
}

export default function HaveWeListenedToIt() {
  const [selectedOpt, setSelectedOpt] = useState<Pick | null>(null);
  const [haveWeListenedToIt, setHaveWeListenedToIt] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Pick[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    setInputValue(value);
  };

  const handleChange2 = (event: React.ChangeEvent<{}>, value: Pick | null) => {
    setSelectedOpt(value);
    setHaveWeListenedToIt(value ? "YES" : "");
  };

  const [colorOfHWLToIt, setColorOfHWLToIt] = useState("");

  useEffect(() => {
    if (haveWeListenedToIt === "YES") {
      setColorOfHWLToIt("green");
    } else {
      setColorOfHWLToIt("");
    }
  }, [haveWeListenedToIt]);

  useEffect(() => {
    const fetchAllPicks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pickData"));
        const allPicks: Pick[] = [];

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data?.weeks) {
            data.weeks.forEach((week: any) => {
              week.picks.forEach((pick: any) => {
                if (pick.songOrAlbumName !== "N/A") {
                  allPicks.push({
                    songOrAlbumName: pick.songOrAlbumName,
                    pickId: pick.pickId,
                    artistName: pick.artistName,
                    songOrAlbumArt:
                      pick.songOrAlbumArt === "Q1W2AotW"
                        ? YsAlbumArt
                        : pick.songOrAlbumArt,
                    memberName: pick.memberName,
                    pickType: pick.pickType,
                  });
                }
              });
            });
          }
        });

        setOptions(allPicks);
      } catch (err) {
        console.error("Error fetching picks from Firebase:", err);
      }
    };

    fetchAllPicks();
  }, []);

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
            {option.pickType.includes("Album") ? "Album" : "Song"}]
          </li>
        )}
        noOptionsText="Hmm...looks like we haven't listened to this yet..."
      />
    </div>
  );
}
