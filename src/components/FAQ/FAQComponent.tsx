import React from "react";
import "../../App.css";
import MyClubSchedule from "./ClubSchedule";
import Socials from "./socials";
import { useMediaQuery } from "@mui/material";
import DateCalendarServerRequest from "./CalendarSched";
import TitleAndDirectory from "../HOME/TitleAndDirectory";

interface Props {}

const FAQComponent = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <React.Fragment>
      <TitleAndDirectory />
      {isMobile ? <br /> : null}
      <div className={isMobile ? "faq2" : "faq"}>
        <h2 style={{ fontSize: 45, textAlign: "center", marginBottom: 15 }}>
          FAQ
        </h2>
        <h2>Q: When/Where does the club meet?</h2>
        <h3 className="answers">
          A: We meet every <b>[DAY OF WEEK]</b> at <b>[TIME OF DAY]</b> in{" "}
          <b>[ROOM IN BUILDING]</b>.
        </h3>

        <h2>Q: What are the requirements to join the club?</h2>
        <h3 className="answers">
          A: Come with an open mind and a willingness to talk, (try) to listen
          to the weekly picks before the meeting, and you must be a NU student.
        </h3>

        <h2>Q: Do I need to be in Bienen?</h2>
        <h3 className="answers">
          A: <b>NO!</b> Our club aims to be accessible to all students. You
          don't need to be in Bienen, be a music major, or have in-depth
          knowledge of music theory to participate!
        </h3>

        <h2>Q: What streaming service(s) do you primarily use for the club?</h2>
        <h3 className="answers2">
          A:{" "}
          <b>
            <a
              href="https://open.spotify.com/playlist/4M9DE3DCIpJ3xXLEmARFPW?si=0c3cc85fd8334e6c"
              target="_blank"
              rel="noopener noreferrer"
            >
              We use Spotify for our club
            </a>
          </b>
          . Spotify's free subscription tier grants all students (regardless of
          their financial situation) access to the music that we listen to week
          to week.
        </h3>

        <h5
          style={{
            fontFamily: "Roboto-Regular",
            fontStyle: "italic",
            marginBottom: 50,
          }}
        >
          NOTE: Spotify has the worst payout-per-stream rate among the major
          streaming industries. If you're interested in learning more about
          artist compensation from streaming services, here's a great article
          that goes into more detail.{" "}
          <a
            href="https://dittomusic.com/en/blog/how-much-do-music-streaming-services-pay-musicians"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source: DittoMusic.com
          </a>
        </h5>

        <h2>Q: How long are club meetings?</h2>
        <h3 className="answers">
          A: <b>1-1.25 hours.</b> We're have an in-club activities after our
          discussion (but feel free to leave after discussion if you need to!)
        </h3>

        <h2>Q: How can I keep up to date with the club?</h2>
        <h3 className="answers2">
          A: Fill out our interest Google Form! Join our GroupMe! Follow us on
          Spotify, Twitter (X.com), and Instagram! We make and post about our
          weekly playlists on our socials! All sign-up/follow links are below.
          Happy listening!
        </h3>

        <div className="outer-logo-cont">
          <br />
          <Socials />
        </div>
      </div>
      <br />
      <br />
      <div className={isMobile ? "faq2" : "faq"}>
        <h2 style={{ fontSize: 35, textAlign: "center", marginBottom: 15 }}>
          Club Schedule
        </h2>
        <br />
        <MyClubSchedule />
      </div>
      <br /> <br />
      <div className={isMobile ? "faq2" : "faq"}>
        <h2 style={{ fontSize: 35, textAlign: "center", marginBottom: 15 }}>
          Calendar
        </h2>
        <br />
        <DateCalendarServerRequest />
      </div>
      <br />
    </React.Fragment>
  );
};

export default FAQComponent;
