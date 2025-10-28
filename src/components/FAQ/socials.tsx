import React from "react";
import Grid from "@mui/material/Grid";
import "./socials.css";
import spotifyImg from "../../imgs/companyLogos/spotlogo.png";
import instaImg from "../../imgs/companyLogos/instalogo.png";
import groupMeImg from "../../imgs/companyLogos/groupmelogo.png";
import googleFormImg from "../../imgs/companyLogos/googleformlogo.png";
import { useSocialLinks } from "../DEV/hooks/useSocialLinks";

function Socials() {
  const {
    interestFormLinks,
    groupMeLinks,
    instagramLinks,
    spotifyLinks,
    loading,
    error,
  } = useSocialLinks();
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;
  return (
    <>
      {!loading && (
        <>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10} sm={4} md={3} className="inner-logo-cont">
              <a
                href={interestFormLinks[0]?.link ?? "#"}
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

            <Grid item xs={10} sm={4} md={3} className="inner-logo-cont">
              <a
                href={groupMeLinks[0]?.link ?? "#"}
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

            <Grid item xs={10} sm={4} md={3} className="inner-logo-cont">
              <a
                href={spotifyLinks[0]?.link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={spotifyImg}
                  alt="Spotify Logo"
                  className="company-logos"
                />
              </a>
              <p>Follow Us!</p>
            </Grid>

            <Grid item xs={10} sm={4} md={3} className="inner-logo-cont">
              <a
                href={instagramLinks[0]?.link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={instaImg}
                  alt="Instagram Logo"
                  className="company-logos"
                />
              </a>
              <p>Follow Us!</p>
            </Grid>

            {/* <Grid item xs={12} sm={6} md={4} className="inner-logo-cont">
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
      </Grid> */}

            {/* <Grid item xs={12} sm={6} md={4} className="inner-logo-cont">
        {/* <a
          href="https://music.apple.com/us/browse"
          target="_blank"
          rel="noopener noreferrer"
        > */}
            {/* <img src={appMusImg} alt="Apple Music Logo" className="company-logos" /> */}
            {/* </a> }
        <p>Account Not Made</p>
      </Grid> */}
          </Grid>
        </>
      )}
    </>
  );
}

export default Socials;
