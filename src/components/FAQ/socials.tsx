import React from "react";
import Grid from "@mui/material/Grid";
import "./socials.css";
import spotifyImg from "../../imgs/companyLogos/spotlogo.png";
import instaImg from "../../imgs/companyLogos/instalogo.png";
import appMusImg from "../../imgs/companyLogos/applemusiclogo.png";
import groupMeImg from "../../imgs/companyLogos/groupmelogo.png";
import googleFormImg from "../../imgs/companyLogos/googleformlogo.png";
import { useEffect, useState } from "react";
import {
  fetchGroupMeLink,
  fetchInterestForm,
  fetchInstagram,
  fetchSpotify,
} from "../../firebase/FirebaseFunctions";
import {
  interestFormType,
  groupMeLinkType,
  instagramLinkType,
  spotifyLinkType,
} from "../../firebase/models";

function Socials() {
  const [interestForm, setInterestForm] = useState<interestFormType[]>([]);
  const [groupMeLink, setGroupMeLink] = useState<groupMeLinkType[]>([]);
  const [instagramLink, setInstagramLink] = useState<instagramLinkType[]>([]);
  const [spotifyLink, setSpotifyLink] = useState<instagramLinkType[]>([]);
  useEffect(() => {
    const loadInterestForm = async () => {
      const data = await fetchInterestForm();
      setInterestForm(data);
    };
    const loadGroupMe = async () => {
      const data = await fetchGroupMeLink();
      setGroupMeLink(data);
    };
    const loadInstagram = async () => {
      const data = await fetchInstagram();
      setInstagramLink(data);
    };
    const loadSpotify = async () => {
      const data = await fetchSpotify();
      setSpotifyLink(data);
    };
    loadInterestForm();
    loadGroupMe();
    loadInstagram();
    loadSpotify();
  }, []);
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={10} sm={4} md={3} className="inner-logo-cont">
        <a
          href={interestForm[0]?.link ?? "#"}
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
          href={groupMeLink[0]?.link ?? "#"}
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
          href={spotifyLink[0]?.link ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={spotifyImg} alt="Spotify Logo" className="company-logos" />
        </a>
        <p>Follow Us!</p>
      </Grid>

      <Grid item xs={10} sm={4} md={3} className="inner-logo-cont">
        <a
          href={instagramLink[0]?.link ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instaImg} alt="Instagram Logo" className="company-logos" />
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
  );
}

export default Socials;
