import React from "react";
import Button from "@mui/material/Button";
interface BlackButtonProps {
  buttonText: string;
}

function BlackButton({ buttonText }: BlackButtonProps) {
  return (
    <Button
      sx={{
        backgroundColor: "black",
        color: "white",
        "&:hover": {
          backgroundColor: "gray", // Optional: change the color on hover
        },
      }}
    >
      {buttonText}
    </Button>
  );
}

export default BlackButton;
