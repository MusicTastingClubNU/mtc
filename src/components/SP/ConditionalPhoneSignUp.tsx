import React from "react";
import googleFormImg from "../../imgs/companyLogos/googleformlogo.png";
import groupmeImg from "../../imgs/companyLogos/groupmelogo.png";
import "./phone-only-salespitch.css";
import "./mission.css";

export default function ConditionalPhoneSignUp() {
  return (
    <div className="phone-su-cont2">
      <h1 style={{ textAlign: "center" }}>
        INTERESTED? Fill out our interest form and to join our GroupMe!
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
            href="https://groupme.com/join_group/98384670/EHkMPGSy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={groupmeImg}
              alt="GroupMe Join"
              className="phone-su-logos"
            />
          </a>
          <p>Join Our GroupMe!</p>
        </div>
      </div>
    </div>
  );
}
