import * as React from "react";
import { Chip, Stack, Box, Divider } from "@mui/material";
import pastGen from "./PastGenres.json";

// type PickOrNotList = [string, string[]][];
// type Colors = string[];

// interface MemberPicksOrNotPicksProps {
//   pickOrNotList: PickOrNotList;
//   colors: Colors;
// }

export default function PastGenres() {
  return (
    <>
      <h3 style={{ marginTop: 40, textAlign: "center" }}>Prev Album Genres</h3>
      <Box
        display="flex"
        flexWrap="wrap"
        sx={{ alignItems: "center", justifyContent: "center", width: "100%" }}
      >
        {/* TODO Need to make the quarterIndex some Redux variable */}
        {pastGen[0]["Prev Album Genres"].map((item, ind) => (
          <Chip
            key={ind}
            label={item}
            style={{
              backgroundColor: `hsl(${
                (ind * 360) / pastGen[0]["Prev Album Genres"].length
              }, 100%, 75%)`,
              margin: 10,
            }}
          />
        ))}
      </Box>
    </>
  );
}
