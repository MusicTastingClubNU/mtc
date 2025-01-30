import { useMediaQuery } from "@mui/material";
import img from "../../imgs/MTC_logo.png";

export default function OurMissionPanel() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className={isMobile ? "mission-cont2" : "mission-cont"}>
      <div className="mission">
        <h1>OUR MISSION:</h1>
        <h3>
          To have members discover new music and to build community through
          shared passion and discussion.
        </h3>
      </div>
      <div style={{ textAlign: "center" }}>
        <img src={img} alt="logo img" className="mission-img"></img>
        <p className="thingghost-insta-link">
          Logo by{" "}
          <a
            href="https://www.instagram.com/itsuhkat/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @itsuhkat
          </a>
        </p>
      </div>
    </div>
  );
}
