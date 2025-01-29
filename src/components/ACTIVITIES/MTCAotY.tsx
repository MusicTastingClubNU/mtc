import { useState, useEffect } from "react";
import React from "react";
import aoty from "./aotyData.json";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import "../BLOG/blog.css";
import { useMediaQuery } from "@mui/material";

export default function MTCAotY() {
  const [activeTab, setActiveTab] = useState(0);
  const [yr, setYr] = useState(2024);
  useEffect(() => {
    setYr(activeTab);
  }, [activeTab]);
  console.log("yr" + yr);
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <div className={isMobile ? "faq2" : "faq"}>
        <h2 className="blog-titles" style={{ textAlign: "center" }}>
          MTC's Albums of 2024
        </h2>
        <Box>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            centered
          >
            {aoty.map((tab, index) => (
              <Tab
                key={index}
                label={tab.year}
                sx={{
                  fontSize: "1.1rem",
                  padding: "5px 10px",
                }}
              />
            ))}
          </Tabs>
          <Box p={2}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                marginRight: 0,
                marginLeft: 0,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              {aoty
                .filter((pick3) => pick3.aotyId == yr)
                .map((pick2) => (
                  <>
                    {pick2.albumPicks.map((pick) => (
                      <>
                        <div className="aoty">
                          <img
                            src={pick.albumArt}
                            alt="albumOrSongArt"
                            style={{ width: "90%", borderRadius: 10 }}
                          ></img>
                          <div
                            style={{
                              fontWeight: "bold",
                              margin: 5,
                              fontSize: 18,
                            }}
                          >
                            {pick.albumName !== "N/A" ? (
                              <>{pick.albumName}</>
                            ) : (
                              "N/A"
                            )}
                          </div>
                          <div
                            style={{
                              fontWeight: "bold",
                              margin: 5,
                              fontSize: 15,
                            }}
                          >
                            {pick.albumName !== "N/A" && (
                              <>by {pick.artistName}</>
                            )}
                          </div>
                          <div
                            style={{
                              fontWeight: "bold",
                              margin: 5,
                              fontSize: 12,
                            }}
                          ></div>
                        </div>
                      </>
                    ))}
                  </>
                ))}
            </div>
          </Box>
        </Box>
      </div>
    </>
  );
}
