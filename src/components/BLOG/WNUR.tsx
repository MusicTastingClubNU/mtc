import { useEffect, useRef } from "react";
import { useMediaQuery } from "@mui/material";

const WNUR = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
          className="flex items-center justify-center"
          onClick={() =>
            window.open(
              "https://wnurnews.org/finding-your-niche-an-inside-look-at-some-of-nus-unique-clubs/",
              "_blank"
            )
          }
          style={{ cursor: "pointer" }}
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
            className="wp-embedded-content"
          />
        </div>
      </div>
    </div>
  );
};

export default WNUR;
