import { useEffect, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import "./blog.css";
import theDailyASGSenateMeetingImg from "../../imgs/mediaAppearances/TheDailyASG.png";
import theDailyLogo from "../../imgs/mediaAppearances/TheDailyLogo.png";
const MediaAppearances = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const asgSenate =
    "Black Poetry Society received the largest portion of the $11,000 allocated from the New Student Organization Support Fund by the Associated Student Government on Wednesday, taking home $750. New student organizations that have been on campus for less than two years were eligible to receive funding at the Winter Quarter NSOSF Funding Senate. ";
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!iframeRef.current) return;

      const { data } = event;
      if (data?.message === "height" && data.secret === "BGz5WHbHJa") {
        let newHeight = parseInt(data.value, 10);
        newHeight = newHeight > 1000 ? 1000 : newHeight < 200 ? 200 : newHeight;
        iframeRef.current.style.height = `${newHeight}px`;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="blog-cont2">
      <h2 className="blog-titles">MEDIA APPEARANCES</h2>

      <div>
        <div
          onClick={() =>
            window.open(
              "https://wnurnews.org/finding-your-niche-an-inside-look-at-some-of-nus-unique-clubs/",
              "_blank"
            )
          }
          style={{
            cursor: "pointer",
            marginBottom: 10,
          }}
        >
          <iframe
            ref={iframeRef}
            sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation"
            src="https://wnurnews.org/finding-your-niche-an-inside-look-at-some-of-nus-unique-clubs/embed/#?secret=BGz5WHbHJa"
            width="100%"
            height="auto"
            style={{ aspectRatio: "16/9", pointerEvents: "none" }}
            title="Finding Your Niche: An Inside Look at Some of NU’s Unique Clubs"
            data-secret="BGz5WHbHJa"
            frameBorder="0"
            marginWidth={0}
            marginHeight={0}
            scrolling="no"
          />
        </div>
      </div>
      <div>
        <div
          onClick={() =>
            window.open(
              "https://dailynorthwestern.com/2025/03/06/campus/new-student-organizations-receive-11000-in-funding-from-asg-senate/",
              "_blank"
            )
          }
          style={{
            cursor: "pointer",
            borderStyle: "solid",
            borderColor: "lightgray",
            borderWidth: "1px",
          }}
        >
          <div style={{ padding: 25 }}>
            <h3 style={{ fontSize: "20px" }}>
              New student organizations receive $11,000 in funding from ASG
              Senate
            </h3>
            <div
              style={{
                alignContent: "center",
                justifyContent: "center",
                display: "flex",
                marginTop: 15,
              }}
            >
              <img
                src={theDailyASGSenateMeetingImg}
                style={{
                  minWidth: "175px",
                  maxWidth: "175px",
                  maxHeight: "125px",
                  minHeight: "125px",
                  position: "relative",
                }}
              ></img>
              <div>
                <h5 style={{ color: "gray", marginLeft: 20 }}>{asgSenate}</h5>
                <h5 style={{ color: "lightgray", marginLeft: 20 }}>
                  Continue Reading...
                </h5>
              </div>
            </div>
            <div
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <img src={theDailyLogo}></img>
              <h5 style={{ marginLeft: 10, color: "gray", fontSize: 15 }}>
                The Daily Northwestern
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaAppearances;
