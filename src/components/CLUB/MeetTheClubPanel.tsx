import { useMediaQuery } from "@mui/material";
import MTCClubPhotoFQ24 from "../../imgs/execBoardImgs/MTC_club_photo_FQ24.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import * as React from "react";
import Image, { StaticImageData } from "next/image";
import MTCClubPhotoWQ25 from "../../imgs/execBoardImgs/MTC_club_photo_WQ25.jpg";
import MTCClubPhotoSQ25 from "../../imgs/execBoardImgs/MTC_club_photo_SQ25.jpg";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

function NameWrapper(names: string) {
  return <p style={{ marginBottom: -30 }}>{names}</p>;
}

type ClubPhotoComponentProps = {
  src: string;
  alt: string;
  quarter: string;
  backRow: string;
  frontRow: string;
  frontFrontRow?: string;
  notPictured: string;
  photographerLink: string;
  photographerName: string;
};

const ClubPhotoComponent: React.FC<ClubPhotoComponentProps> = ({
  src,
  alt,
  quarter,
  backRow,
  frontRow,
  frontFrontRow,
  notPictured,
  photographerLink,
  photographerName,
}) => (
  <div className="club-photo-container">
    {src && (
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", marginTop: 20, borderRadius: 10 }}
      ></img>
    )}
    <div style={{ textAlign: "center" }}>
      <h4 style={{ marginTop: 10, marginBottom: -20 }}>{quarter} MEMBERS:</h4>
      {NameWrapper(backRow)}
      {NameWrapper(frontRow)}
      {frontFrontRow && <>{NameWrapper(frontFrontRow)}</>}
      {NameWrapper(notPictured)}
      <p style={{ marginBottom: -10 }}>
        Photography by{" "}
        <a href={photographerLink} target="_blank" rel="noopener noreferrer">
          {photographerName}
        </a>
      </p>
    </div>
  </div>
);

export default function MeetTheClubPanel() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className={isMobile ? "faq2" : "faq"}>
      <h2 className="exec-board-title">
        MEET THE CLUB!{" "}
        {value === 0
          ? "(SQ25)"
          : value === 1
          ? "(WQ25)"
          : value === 2 && "(FQ24)"}
      </h2>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="SQ25" {...a11yProps(0)} />
          <Tab label="WQ25" {...a11yProps(1)} />
          <Tab label="FQ24" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ClubPhotoComponent
          src={MTCClubPhotoSQ25}
          alt="MTCClubPhotoSQ25"
          quarter="SQ25"
          backRow="Daniel - Derrick - AJ - Abbie - Corey - Simon - Reed - Susanna - Cai"
          frontRow="Andrew B - Archie - Grace - Katie - Ryan L - Sid - Ryan M - Jameson - Danny - Aidan - Andrew W - Carter"
          notPictured="Not Pictured: Joseph"
          photographerLink="https://www.jelkphoto.com/"
          photographerName="Jonah Elkowitz"
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ClubPhotoComponent
          src={MTCClubPhotoWQ25}
          alt="MTCClubPhotoWQ25"
          quarter="WQ25"
          backRow="Arch - Katie - Grace - Aidan - Danny - Joseph - Andrew"
          frontRow="Daniel - Jameson - Simon - Corey - AJ - Reed"
          notPictured="Not Pictured: Cai - Isabel - Susanna - Ryan"
          photographerLink="https://luiscastaneda220.wixsite.com/lcmedia"
          photographerName="Luis Castañeda"
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ClubPhotoComponent
          src={MTCClubPhotoFQ24}
          alt="MTCClubPhotoFQ24"
          quarter="FQ24"
          backRow="Arch - Aidan - Andrew - Joseph - Danny"
          frontRow="Daniel - Reed - Simon - Corey - Susanna - Maya - Cai"
          notPictured="Not Pictured: Grace - Ryan - AJ - Acton - Zoey"
          photographerLink="https://www.jelkphoto.com/"
          photographerName="Jonah Elkowitz"
        />
      </CustomTabPanel>
    </div>
  );
}
