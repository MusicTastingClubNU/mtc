import React from "react";
import "../../App.css";
import MyClubSchedule from "../CLUB/ClubSchedule";
import Socials from "./socials";
import { useMediaQuery } from "@mui/material";
import DateCalendarServerRequest from "../CLUB/CalendarSched";
import TitleAndDirectory from "../HOME/TitleAndDirectory";
import { useSocialLinks } from "../DEV/hooks/useSocialLinks";
import { useRoomDayTime } from "../DEV/hooks/useRoomDateTime";
interface Props {}

const FAQComponent = (props: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const {
    spotifyLinks,
    loading: socialLoading,
    error: socialError,
  } = useSocialLinks();
  const {
    roomDayTime,
    loading: roomLoading,
    error: roomError,
  } = useRoomDayTime();

  const loading = roomLoading || socialLoading;
  const meetingDay = roomDayTime?.day;
  const meetingTime = roomDayTime?.time;
  const meetingLocation = roomDayTime?.room;
  const checkBackInNextQuarter =
    "<h3 className='answers'>A: We currently haven't decided on a Day/Time/Room for next quarter. Stay tuned!<h3>";
  const currentQuarterDayTimeLocation = `<h3 className='answers'>A: We meet every <u>${meetingDay}</u> from <u>${meetingTime}</u> in <u>${meetingLocation}</u>.</h3>`;
  return (
    <>
      <TitleAndDirectory />

      {isMobile ? <br /> : null}
      <div className={isMobile ? "faq2" : "faq"}>
        <h2 style={{ fontSize: 45, textAlign: "center", marginBottom: 15 }}>
          FAQ
        </h2>
        <h2>Q: When/Where does the club meet?</h2>
        {!loading && (
          <>
            <div
              className="answers"
              dangerouslySetInnerHTML={{
                __html: roomDayTime?.onBreak
                  ? checkBackInNextQuarter
                  : currentQuarterDayTimeLocation,
              }}
            ></div>
          </>
        )}
        <h2>Q: What are the requirements to join the club?</h2>
        <h3 className="answers">
          A: Come with an open mind and a willingness to talk, (try) to listen
          to the weekly picks before the meeting, and you must be a NU student.
        </h3>

        <h2>Q: Do I need to be in Bienen?</h2>
        <h3 className="answers2">
          A: <b>NO!</b> Our club aims to be accessible to all students. You
          don't need to be in Bienen, be a music major, or have in-depth
          knowledge of music theory to participate!
        </h3>

        <h4 className="answers">
          Official MTC Inclusion Statement: The Music Tasting Club is open to
          all Northwestern undergraduate students. There are no auditions, no
          dues, and no educational requirements.
        </h4>
        <h2>Q: What streaming service(s) do you primarily use for the club?</h2>
        <h3 className="answers">
          A:{" "}
          <b>
            <a
              href={spotifyLinks[0]?.link ?? "#"}
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

        <h2>Q: How long are club meetings?</h2>
        <h3 className="answers">
          A: <b>1-1.25 hours.</b> We're have an in-club activities after our
          discussion (but feel free to leave after discussion if you need to!)
        </h3>

        <h2>Q: How can I keep up to date with the club?</h2>
        <h3 className="answers2">
          A: Fill out our interest Google Form! Join our GroupMe! Follow us on
          Spotify and Instagram! We make and post about our weekly playlists on
          our socials! All sign-up/follow links are below. Happy listening!
        </h3>

        <div className="outer-logo-cont">
          <Socials />
        </div>
      </div>
    </>
  );
};

export default FAQComponent;
