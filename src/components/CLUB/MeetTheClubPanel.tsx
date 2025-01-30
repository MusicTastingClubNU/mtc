import { useMediaQuery } from "@mui/material";
import MTCClubPhotoFQ24 from "../../imgs/execBoardImgs/MTC_club_photo_FQ24.png";

export default function MeetTheClubPanel() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className={isMobile ? "faq2" : "faq"}>
      <h2 className="exec-board-title">MEET THE CLUB! (FQ24)</h2>
      <div className="club-photo-container">
        <img
          src={MTCClubPhotoFQ24}
          alt="MTCClubPhotoFQ24"
          style={{ width: "100%", marginTop: 20, borderRadius: 10 }}
        ></img>
        <div style={{ textAlign: "center" }}>
          <h4 style={{ marginTop: 10, marginBottom: -20 }}>FQ24 MEMBERS:</h4>
          <p style={{ marginBottom: -30 }}>
            Arch - Aidan - Andrew - Joseph - Danny
          </p>
          <p style={{ marginBottom: -30 }}>
            Daniel - Reed - Simon - Corey - Susanna - Maya - Cai
          </p>
          <p style={{ marginBottom: -30 }}>
            Not Pictured: Grace - Ryan - AJ - Acton - Zoey
          </p>
          <p style={{ marginBottom: -10 }}>
            Photography by{" "}
            <a
              href={"https://www.jelkphoto.com/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Jonah Elkowitz
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
