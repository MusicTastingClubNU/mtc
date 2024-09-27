import React from "react";
import Grid from "@mui/material/Grid";
import "./socials.css";
import spotifyImg from "../../imgs/companyLogos/spotlogo.png";
import instaImg from "../../imgs/companyLogos/instalogo.png";
import appMusImg from "../../imgs/companyLogos/applemusiclogo.png";
import groupMeImg from "../../imgs/companyLogos/groupmelogo.png";
import googleFormImg from "../../imgs/companyLogos/googleformlogo.png";
import twitterImg from "../../imgs/companyLogos/twitterlogo.png";
// import listservImg from "../../imgs/listservimg.png"; // Commented out since it's not used

function Socials() {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6} md={4} className="inner-logo-cont">
        <a
          href="https://forms.gle/hKSK1pqY2gKNomjD9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={googleFormImg}
            alt="Google Form Img"
            className="company-logos"
          />
        </a>
        <p>Interest Form</p>
      </Grid>

      <Grid item xs={12} sm={6} md={4} className="inner-logo-cont">
        <a
          href="https://groupme.com/join_group/98384670/EHkMPGSy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={groupMeImg}
            alt="GroupMe Join Logo"
            className="company-logos"
          />
        </a>
        <p>Join Our GroupMe!</p>
      </Grid>

      <Grid item xs={12} sm={6} md={4} className="inner-logo-cont">
        <a
          href="https://open.spotify.com/user/31apxxxqaadrj24rjilx75insprq"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={spotifyImg} alt="Spotify Logo" className="company-logos" />
        </a>
        <p>Follow Us!</p>
      </Grid>

      <Grid item xs={12} sm={6} md={4} className="inner-logo-cont">
        <a
          href="https://www.instagram.com/musictastingclub?igsh=M2hobjkxa29ja3Jq&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instaImg} alt="Instagram Logo" className="company-logos" />
        </a>
        <p>Follow Us!</p>
      </Grid>

      <Grid item xs={12} sm={6} md={4} className="inner-logo-cont">
        <a
          href="https://x.com/MusicTastinClub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={twitterImg}
            alt="Twitter Logo"
            className="company-logos rounded-logo"
          />
        </a>
        <p>Follow Us!</p>
      </Grid>

      <Grid item xs={12} sm={6} md={4} className="inner-logo-cont">
        {/* <a
          href="https://music.apple.com/us/browse"
          target="_blank"
          rel="noopener noreferrer"
        > */}
        <img src={appMusImg} alt="Apple Music Logo" className="company-logos" />
        {/* </a> */}
        <p>Account Not Made</p>
      </Grid>
    </Grid>
  );
}

export default Socials;
