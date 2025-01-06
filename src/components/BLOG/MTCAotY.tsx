// import React from "react";
// import aoty from "./aotyData.json";

// interface MTCAotYProps {
//   year: number;
// }
// const MTCAotY: React.FC<MTCAotYProps> = ({ year }) => {
//   return (
//     <>
//       <div className="blog-cont2">
//         {aoty.map((albums) => (
//           <>{albums.year == year ? "yes" : "no"}</>
//         ))}
//       </div>
//     </>
//   );
// };
// import React, { useState } from "react";
// export default MTCAotY;

import { useState, useEffect } from "react";
import React from "react";
import aoty from "./aotyData.json";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import "./blog.css";

const tabData = [
  { label: "Category 1", content: ["Item 1", "Item 2", "Item 3"] },
  { label: "Category 2", content: ["Item A", "Item B", "Item C"] },
  { label: "Category 3", content: ["Item X", "Item Y", "Item Z"] },
];

export default function TabsList() {
  const [activeTab, setActiveTab] = useState(0);
  const [yr, setYr] = useState(2024);
  useEffect(() => {
    setYr(activeTab);
  }, [activeTab]);
  console.log("yr" + yr);

  return (
    <div className="blog-cont2">
      <h2 className="blog-titles" style={{ textAlign: "center" }}>
        MTC's Albums of 2024
      </h2>
      <Box>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
        >
          {aoty.map((tab, index) => (
            <Tab key={index} label={tab.year} />
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
                          {pick.albumName !== "N/A" ? (
                            <>by {pick.artistName}</>
                          ) : (
                            <></>
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
  );
}

/* {tabData[activeTab].content.map((item, index) => (
            <Typography key={index}>{item}</Typography>
          ))} */

/* <div
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
              .filter((pick2) => pick2.aotyId === yr)
              .map((pick2) => (
                <div className="enre-starter-packs">
                  {pick2.albumPicks.map((pick) => (
                    <>
                      <div>
                        <h5>{pick.albumName}</h5>
                      </div>
                      <div>
                        <div>
                          <img
                            src={pick.albumArt}
                            alt="albumOrSongArt"
                            style={{ width: "90%", borderRadius: 10 }}
                          ></img>
                          <div
                            style={{
                              fontWeight: "bold",
                              margin: 10,
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
                              margin: 0,
                              fontSize: 15,
                            }}
                          >
                            {pick.albumName !== "N/A" ? (
                              <>by {pick.artistName}</>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div
                            style={{
                              fontWeight: "bold",
                              margin: 5,
                              fontSize: 12,
                            }}
                          >
                            <br />
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              ))}
          </div> */
