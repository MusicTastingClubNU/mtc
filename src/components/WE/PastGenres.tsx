import * as React from "react";
import { Chip, Stack, Box, Divider } from "@mui/material";
import pastGen from "./PastGenres.json";

export default function PastGenres() {
  return (
    <>
      <h3 style={{ marginTop: 40, textAlign: "center" }}>Prev Album Genres</h3>
      <Box
        display="flex"
        flexWrap="wrap"
        sx={{ alignItems: "center", justifyContent: "center", width: "100%" }}
      >
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
