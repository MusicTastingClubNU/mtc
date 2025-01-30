import React from "react";
import { useMediaQuery } from "@mui/material";
export default function SalespitchPanel() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className={isMobile ? "cont2" : "cont"}>
      <div className="my-centered-text">
        <h2>DO YOU LIKE LISTENING TO/TALKING ABOUT/TRYING OUT NEW MUSIC?</h2>
        <h1>THE MUSIC TASTING CLUB IS THE PLACE FOR YOU!</h1>
        <h3>Imagine a weekly book club, but for albums/songs.</h3>
      </div>
    </div>
  );
}
