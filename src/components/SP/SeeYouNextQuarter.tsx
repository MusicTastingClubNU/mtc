import React from "react";
import "./mission.css";
import { useMediaQuery } from "@mui/material";

export default function SeeYouNextQuarter() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className={isMobile ? "cont2" : "cont"}
      style={{ textAlign: "center" }}
    >
      <h2 style={{ fontSize: 35 }}>SEE YOU IN THE WINTER!</h2>
      <h3>KEEP AN EYE OUT FOR UPDATES VIA THIS WEBSITE / EMAIL / INSTAGRAM!</h3>
    </div>
  );
}
