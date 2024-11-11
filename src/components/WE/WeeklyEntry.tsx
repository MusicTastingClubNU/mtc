import * as React from "react";
import {
  Tabs,
  Tab,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  TextField,
  InputAdornment,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import picksData from "./picksData.json";
import { useState, useEffect } from "react";
import "../SP/mission.css";
import PastGenres from "./PastGenres";
import PrizeWheel from "./NameWheel";
import ThisWeeksPicks from "../SP/ThisWeeksPicks";
import NameWheelData from "./NameWheelData.json";
import { Search } from "@mui/icons-material";
import TitleAndDirectory from "../HOME/TitleAndDirectory";
import Autocomplete from "@mui/material/Autocomplete";
import YsAlbumArt from "../../imgs/manualAlbumArt/WQ24_W2_AotW.png";
import NeuAlbumArt from "../../imgs/manualAlbumArt/WQ24_W3_RUSotW.png";
import TempaTAlbumArt from "../../imgs/manualAlbumArt/WQ24_W9_RUSotW.png";
import FreeAlbumArt from "../../imgs/manualAlbumArt/SQ24_W2_SotW.png";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface Pick {
  pickId: number;
  pickType: string;
  songOrAlbumName: string;
  artistName: string;
  memberName: string;
  songOrAlbumArt: string;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function WeeklyEntry() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [value, setValue] = React.useState(0);
  const [pick, setPick] = useState("Album of the Week");
  const [wheelOptions, setWheelOptions] = useState<string[]>([]);
  const [openRow, setOpenRow] = useState<number | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    let options: string[] = [];
    switch (pick) {
      case "Album of the Week":
        options = NameWheelData["AotW"];
        break;
      case "Runner Up Album of the Week":
        options = NameWheelData["AotW"];
        break;
      case "Song of the Week":
        options = NameWheelData["SotW"];
        break;
      case "Runner Up Song of the Week":
        options = NameWheelData["SotW"];
        break;
      default:
        options = NameWheelData["AotW"];
    }
    setWheelOptions(options);
  }, [pick]);

  const handlePickChange = (event: SelectChangeEvent) => {
    const selectedPick = event.target.value as string;
    setPick(selectedPick);
  };

  const handleRowClick = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };

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
              : pick.songOrAlbumArt === "Q1W3RUSotW"
              ? NeuAlbumArt
              : pick.songOrAlbumArt === "Q1W9RUSotW"
              ? TempaTAlbumArt
              : pick.songOrAlbumArt === "Q2W2SotW"
              ? FreeAlbumArt
              : pick.songOrAlbumArt,
          memberName: pick.memberName,
          pickType: pick.pickType,
        }))
    )
  );

  const renderRows = (weeks: any) => {
    return weeks.map((week: any, index: number) => (
      <React.Fragment key={week.weekId}>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleRowClick(index)}
            >
              {openRow === index ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </TableCell>
          <TableCell align="left">
            <b>
              {week.weekName} PICKS {week.weekDate}
            </b>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={openRow === index} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 2 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Pick Type</b>
                      </TableCell>
                      <TableCell>
                        <b>Pick Name</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Artist</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Member</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {week.picks.map((pick: any) => (
                      <TableRow key={pick.pickId}>
                        <TableCell component="th" scope="row">
                          {pick.pickType}
                        </TableCell>
                        <TableCell>{pick.songOrAlbumName}</TableCell>
                        <TableCell align="right">{pick.artistName}</TableCell>
                        <TableCell align="right">{pick.memberName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ));
  };
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

  return (
    <>
      <TitleAndDirectory />
      {isMobile ? <br /> : null}
      <div style={{ marginBottom: 40 }}>
        <ThisWeeksPicks></ThisWeeksPicks>
      </div>

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

      <div className={isMobile ? "cont2" : "cont"} style={{ marginTop: 40 }}>
        <h3 style={{ fontSize: 35, textAlign: "center", marginBottom: 15 }}>
          PREVIOUS PICKS
        </h3>
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {picksData.map((quarter, index) => (
                <Tab
                  key={quarter.quarterId}
                  label={`${quarter.quarterName} Picks`}
                  {...a11yProps(index)}
                  sx={{ width: "33%" }}
                />
              ))}
            </Tabs>
          </Box>
          {picksData.map((quarter, index) => (
            <CustomTabPanel key={quarter.quarterId} value={value} index={index}>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableBody>{renderRows(quarter.weeks)}</TableBody>
                </Table>
              </TableContainer>
              {/* {isMobile ? null : index === 1 ? <PastGenres /> : null} */}
            </CustomTabPanel>
          ))}
        </Box>
      </div>

      <div style={{ marginTop: 40, marginBottom: 40, padding: 0 }}>
        {isMobile ? null : (
          <PrizeWheel
            options={wheelOptions}
            title={pick}
            handlePickChange={handlePickChange}
            nameWheelDataToBeCopied={NameWheelData}
          />
        )}
      </div>
    </>
  );
}
