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
  TableRow,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, useEffect } from "react";
import "../SP/mission.css";
import PastGenres from "./PastGenres";
import { Margin, Search } from "@mui/icons-material";
import TitleAndDirectory from "../HOME/TitleAndDirectory";
import Autocomplete from "@mui/material/Autocomplete";
import YsAlbumArt from "../../imgs/manualAlbumArt/WQ24_W2_AotW.png";
import SeeYouNextQuarter from "../SP/SeeYouNextQuarter";
import spotifyImg from "../../imgs/companyLogos/spotlogo.png";
import logo from "../../imgs/MTCLogo/MTC_logo.png";
import HaveWeListenedToIt from "./HaveWeListenedToIt";
import ThisWeeksPicks from "../SP/ThisWeeksPicks";
import { db } from "../../firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRoomDayTime } from "../DEV/hooks/useRoomDateTime";
//TODO: Organize previous picks by year
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
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [picksData, setPicksData] = useState<any[]>([]);
  useEffect(() => {
    const fetchPicksFromFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pickData"));
        const allQuarters: any[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // Convert weeks object to array if needed
          const weeks = Array.isArray(data.weeks)
            ? data.weeks
            : Object.values(data.weeks || {});

          allQuarters.push({
            ...data,
            quarterName: data.quarterName,
            weeks, // ✅ ensures this is always an array
          });
        });

        // Sort by quarterId descending (optional)
        allQuarters.sort((a, b) => b.quarterId - a.quarterId);

        setPicksData(allQuarters);
      } catch (err) {
        console.error("Error fetching pickData from Firestore:", err);
      }
    };

    fetchPicksFromFirebase();
  }, []);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handlePickChange = (event: SelectChangeEvent) => {
    const selectedPick = event.target.value as string;
    setPick(selectedPick);
  };

  const handleRowClick = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };

  const renderRows = (weeks: any) => {
    return weeks.map((week: any, index: number) => (
      <React.Fragment key={index}>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          {/* ||| DROP DOWN ARROW CODE ||| */}
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

          {/* TODO: It stays open when the tab changes */}

          {/* ||| "WEEK X PICKS" CODE ||| */}
          <TableCell align="left" sx={{ position: "left" }}>
            <b>
              {week.weekName} PICKS {week.weekDate}
            </b>
          </TableCell>

          {/* ||| SPOTIFY LINK CODE ||| */}
          <TableCell align="right">
            {openRow === index && week?.spotifyPlaylistLink !== "" && (
              <a
                href={week?.spotifyPlaylistLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={spotifyImg}
                  alt="Spotify Logo"
                  style={{ width: 30, marginRight: 25 }}
                />
              </a>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={openRow === index} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 2 }}>
                <Table size="small" aria-label="purchases">
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      margin: "10px 0",
                    }}
                  >
                    {week.picks.map((pick: any) => (
                      <div className="picks-history">
                        {pick.pickType === "Song of the Week" ? (
                          <div
                            style={{
                              fontWeight: "bold",
                              marginBottom: 30,
                              marginTop: 10,
                            }}
                          >
                            {pick.pickType}:
                          </div>
                        ) : (
                          <div style={{ fontWeight: "bold", margin: 10 }}>
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
                          ></img>
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
                            {pick.songOrAlbumName !== "N/A" && (
                              <>by {pick.artistName}</>
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
                            {pick.songOrAlbumName !== "N/A" && (
                              <>Picked by {pick.memberName}</>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ));
  };

  //As of Winter Quarter 2025, there will be 4 quarters of MTC
  const numberOfQuarterTabsBelowPREVIOUSPICKS = picksData.length || 1;
  const widthOfTabs = 100 / numberOfQuarterTabsBelowPREVIOUSPICKS;
  const stringThatDictatesNumberOfTabsBelowPREVIOUSPICKS =
    widthOfTabs.toString() + "%";
  const { roomDayTime } = useRoomDayTime();
  return (
    <>
      <TitleAndDirectory />
      {isMobile ? <br /> : null}
      {/* ||| HAVE WE LISTENED TO IT SEARCH BAR*/}
      {roomDayTime?.onBreak ? <SeeYouNextQuarter /> : <ThisWeeksPicks />}
      <HaveWeListenedToIt />
      <div className={isMobile ? "cont2" : "cont"} style={{ marginTop: 40 }}>
        {/* ||| TITLE CODE ||| */}
        <h3 style={{ fontSize: 35, textAlign: "center", marginBottom: 15 }}>
          PREVIOUS PICKS
        </h3>

        {/* ||| QUARTER TABS ||| */}
        {/* You can have as many tabs in the data as you want, make 
        sure you update numberOfQuarterTabsBelowPREVIOUSPICKS to the appropriate number 
        of quarters that have passed.*/}
        <Box>
          {/* CODE FOR A DIVIDER LINE vvv */}
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {picksData.map((quarter, index) => (
                <Tab
                  key={index}
                  label={`${quarter.quarterName} Picks`}
                  {...a11yProps(index)}
                  sx={{
                    width: stringThatDictatesNumberOfTabsBelowPREVIOUSPICKS,
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* ||| IMPLEMENTS WEEK PICK DROPDOWN CODE ||| */}
          {picksData.map((quarter, index) => (
            <CustomTabPanel key={index} value={value} index={index}>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableBody>{renderRows(quarter.weeks)}</TableBody>
                </Table>
              </TableContainer>
            </CustomTabPanel>
          ))}
        </Box>
      </div>
      <br /> <br />
    </>
  );
}
