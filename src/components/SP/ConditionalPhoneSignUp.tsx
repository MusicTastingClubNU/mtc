import React from "react";
import googleFormImg from "../../imgs/companyLogos/googleformlogo.png";
import discordImg from "../../imgs/companyLogos/discordlogo.png";
import "./phone-only-salespitch.css";
import "./mission.css";

export default function ConditionalPhoneSignUp() {
  return (
    <div className="phone-su-cont2">
      <h1 style={{ textAlign: "center" }}>
        INTERESTED? Fill out our interest form and to join our Discord!
      </h1>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: -30 }}
      >
        <div className="phone-su-inner-logo-cont">
          <a
            href="https://forms.gle/hKSK1pqY2gKNomjD9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={googleFormImg}
              alt="Google Form Img"
              className="phone-su-logos"
            />
          </a>
          <p>Interest Form</p>
        </div>

        <div className="phone-su-inner-logo-cont">
          <a
            href="https://discord.gg/JzYa55p25m"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={discordImg}
              alt="Discord Join Logo"
              className="phone-su-logos"
            />
          </a>
          <p>Join Our Discord!</p>
        </div>
      </div>
    </div>
  );
}
