import React from "react";
import googleFormImg from "../../imgs/companyLogos/googleformlogo.png";
import groupmeImg from "../../imgs/companyLogos/groupmelogo.png";
import "./phone-only-salespitch.css";
import "./mission.css";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import {
  fetchGroupMeLink,
  fetchInterestForm,
} from "../../firebase/FirebaseFunctions";
import { interestFormType, groupMeLinkType } from "../../firebase/models";

export default function SignUpPanel() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [interestForm, setInterestForm] = useState<interestFormType[]>([]);
  const [groupMeLink, setGroupMeLink] = useState<groupMeLinkType[]>([]);
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchInterestForm();
      setInterestForm(data);
    };
    loadData();
  }, []);
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchGroupMeLink();
      setGroupMeLink(data);
    };
    loadData();
  }, []);
  return (
    <div className={isMobile ? "cont2" : "cont"} style={{ marginBottom: 50 }}>
      <h1 style={{ textAlign: "center", marginBottom: 10 }}>
        INTERESTED? Fill out our interest form and to join our GroupMe!
      </h1>
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: -30 }}
      >
        <div className="phone-su-inner-logo-cont">
          <a
            href={interestForm[0]?.link ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={googleFormImg}
              alt="Google Form Img "
              className="phone-su-logos"
            />
          </a>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Interest Form
          </p>
        </div>

        <div className="phone-su-inner-logo-cont">
          <a
            href={groupMeLink[0]?.link ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={groupmeImg}
              alt="GroupMe Join"
              className="phone-su-logos"
            />
          </a>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Join Our GroupMe!
          </p>
        </div>
      </div>
    </div>
  );
}
