import React, { useEffect, useState } from "react";
import "../SP/mission.css";
import { useMediaQuery, Typography } from "@mui/material";
import TitleAndDirectory from "../HOME/TitleAndDirectory";
import Login from "../../firebase/Login";
import { db, storage } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

type Exec = {
  name: string;
  position: string;
  positionDescription: string;
  imageURL: string;
  favSong: string;
};

const ExecBoard = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [execs, setExecs] = useState<Exec[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    const fetchExecBoard = async () => {
      try {
        const snapshot = await getDoc(doc(db, "exec", "execData"));
        if (snapshot.exists()) {
          const data = snapshot.data();
          const board: Exec[] = data.execBoard || [];

          const previewUrls = await Promise.all(
            board.map(async (exec) => {
              if (!exec.imageURL) return "";
              try {
                const imgRef = ref(storage, exec.imageURL);
                return await getDownloadURL(imgRef);
              } catch {
                return "";
              }
            })
          );

          setExecs(board);
          setImagePreviews(previewUrls);
        }
      } catch (error) {
        console.error("Error loading exec board:", error);
      }
    };

    fetchExecBoard();
  }, []);

  return (
    <React.Fragment>
      <TitleAndDirectory />
      {isMobile ? <br /> : null}

      <div className="ebc">
        <h2 className="exec-board-title">MEET THE EXEC BOARD!</h2>
        <div className="exec-board-container">
          {execs.map((exec, index) => (
            <div key={index} className="exec-board-item">
              {imagePreviews[index] && (
                <img
                  src={imagePreviews[index]}
                  alt={`${exec.name} profile`}
                  className="exec-board-img"
                />
              )}
              <h2>{exec.name}</h2>
              <h3 style={{ paddingBottom: 10 }}>{exec.position}</h3>
              <h4 style={{ paddingBottom: 10 }}>{exec.positionDescription}</h4>
              {exec.favSong && (
                <h5 style={{ marginTop: 7 }}>Favorite Song: {exec.favSong}</h5>
              )}
              {exec.position.includes("President") &&
                !exec.position.includes("Vice") && <Login />}
            </div>
          ))}
        </div>
      </div>
      <br />
    </React.Fragment>
  );
};

export default ExecBoard;
