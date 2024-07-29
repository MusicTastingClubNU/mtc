import React from "react";
import Grid from "@mui/material/Grid";
import "./socials.css";
import spotifyImg from "../../imgs/companyLogos/spotlogo.png";
import instaImg from "../../imgs/companyLogos/instalogo.png";
import appMusImg from "../../imgs/companyLogos/applemusiclogo.png";
import discordImg from "../../imgs/companyLogos/discordlogo.png";
import googleFormImg from "../../imgs/companyLogos/googleformlogo.png";
import twitterImg from "../../imgs/companyLogos/twitterlogo.png";
// import listservImg from "../../imgs/listservimg.png"; // Commented out since it's not used

function Socials() {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6} md={4} className="inner-logo-cont">
        <a
          href="https://www.google.com/forms/about/"
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
          href="https://discord.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={discordImg}
            alt="Discord Join Logo"
            className="company-logos"
          />
        </a>
        <p>Join Our Discord!</p>
      </Grid>

      <Grid item xs={12} sm={6} md={4} className="inner-logo-cont">
        <a
          href="https://open.spotify.com/playlist/5UkcYrSvakVfYhHbvr3Bru?go=1&sp_cid=0354276646149ba242a28fa53ccacb67&utm_source=embed_player_p&utm_medium=desktop&nd=1&dlsi=4faf9245e69e45df"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={spotifyImg} alt="Spotify Logo" className="company-logos" />
        </a>
        <p>Follow Us!</p>
      </Grid>

      <Grid item xs={12} sm={6} md={4} className="inner-logo-cont">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instaImg} alt="Instagram Logo" className="company-logos" />
        </a>
        <p>Follow Us!</p>
      </Grid>

      <Grid item xs={12} sm={6} md={4} className="inner-logo-cont">
        <a href="https://x.com/home" target="_blank" rel="noopener noreferrer">
          <img
            src={twitterImg}
            alt="Twitter Logo"
            className="company-logos rounded-logo"
          />
        </a>
        <p>Follow Us!</p>
      </Grid>

      <Grid item xs={12} sm={6} md={4} className="inner-logo-cont">
        <a
          href="https://music.apple.com/us/browse"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={appMusImg}
            alt="Apple Music Logo"
            className="company-logos"
          />
        </a>
        <p>Follow Us!</p>
      </Grid>
    </Grid>
  );
}

export default Socials;
