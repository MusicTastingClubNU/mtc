import React from "react";
import { useMediaQuery } from "@mui/material";
import googleFormImg from "../../imgs/companyLogos/googleformlogo.png";

const BlogSubmissionForm = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <div className="blog-cont2">
        <h2 className="blog-titles">Submit Blog Posts Here!</h2>
        <div className="phone-su-inner-logo-cont">
          <a
            href="https://forms.gle/YAYmmXSm4X31hFmW7"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={googleFormImg}
              alt="Blog Form Submission"
              className="phone-su-logos"
            />
          </a>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Blog Submission Form
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogSubmissionForm;
