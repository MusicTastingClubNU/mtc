import { useMediaQuery } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import * as React from "react";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/FirebaseConfig";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type ClubPhotoData = {
  alt: string;
  photoURL: string;
  quarter: string;
  backRow: string[];
  frontRow: string[];
  frontFrontRow?: string[];
  notPictured: string[];
  photographerLink: string;
  photographerName: string;
};

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

function NameWrapper(names: string[], notPictured?: boolean) {
  return (
    <p style={{ marginBottom: -30 }}>
      {notPictured && "Not Pictured: "}
      {names.map((name, index) => (
        <React.Fragment key={index}>
          {name}
          {index < names.length - 1 && " - "}
        </React.Fragment>
      ))}
    </p>
  );
}

type ClubPhotoComponentProps = {
  src: string;
  alt: string;
  quarter: string;
  backRow: string[];
  frontRow: string[];
  frontFrontRow?: string[];
  notPictured: string[];
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
      />
    )}
    <div style={{ textAlign: "center" }}>
      <h4 style={{ marginTop: 10, marginBottom: -20 }}>{quarter} MEMBERS:</h4>
      {backRow && backRow.length > 0 && NameWrapper(backRow)}
      {frontRow && frontRow.length > 0 && NameWrapper(frontRow)}
      {frontFrontRow && frontFrontRow.length > 0 && NameWrapper(frontFrontRow)}
      {notPictured && notPictured.length > 0 && NameWrapper(notPictured, true)}
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
  const [clubPhotos, setClubPhotos] = useState<ClubPhotoData[]>([]);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchClubPhotos = async () => {
      try {
        setLoading(true);

        // Fetch club photo data from Firestore
        const docRef = doc(db, "clubPhoto", "clubPic");
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
          throw new Error("No club photos found in database");
        }

        const data = snapshot.data();
        const photos: ClubPhotoData[] = data.pics || [];

        if (photos.length === 0) {
          throw new Error("No photos found in pics array");
        }

        // Reverse the order to show newest first
        const reversedPhotos = [...photos].reverse();
        setClubPhotos(reversedPhotos);

        // Fetch download URLs for all photos
        const urlPromises = reversedPhotos.map(async (photo) => {
          try {
            const storageRef = ref(storage, photo.photoURL);
            return await getDownloadURL(storageRef);
          } catch (error) {
            console.error(`Error fetching URL for ${photo.photoURL}:`, error);
            return ""; // Return empty string as fallback
          }
        });

        const urls = await Promise.all(urlPromises);
        setPhotoUrls(urls);
      } catch (error) {
        console.error("Error fetching club photos:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load club photos"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClubPhotos();
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");

  if (loading) {
    return (
      <div className={isMobile ? "faq2" : "faq"}>
        <h2 className="exec-board-title">MEET THE CLUB!</h2>
        <p>Loading club photos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={isMobile ? "faq2" : "faq"}>
        <h2 className="exec-board-title">MEET THE CLUB!</h2>
        <p>Error loading club photos: {error}</p>
      </div>
    );
  }

  if (clubPhotos.length === 0) {
    return (
      <div className={isMobile ? "faq2" : "faq"}>
        <h2 className="exec-board-title">MEET THE CLUB!</h2>
        <p>No club photos available.</p>
      </div>
    );
  }

  return (
    <div className={isMobile ? "faq2" : "faq"}>
      <h2 className="exec-board-title">
        MEET THE CLUB! {clubPhotos[value] && clubPhotos[value].quarter}
      </h2>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {clubPhotos.map((photo, index) => (
            <Tab key={index} label={photo.quarter} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {clubPhotos.map((photo, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          <ClubPhotoComponent
            src={photoUrls[index] || ""}
            alt={photo.alt}
            quarter={photo.quarter}
            backRow={photo.backRow || []}
            frontRow={photo.frontRow || []}
            frontFrontRow={photo.frontFrontRow}
            notPictured={photo.notPictured || []}
            photographerLink={photo.photographerLink}
            photographerName={photo.photographerName}
          />
        </CustomTabPanel>
      ))}
    </div>
  );
}
