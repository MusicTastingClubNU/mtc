import React from "react";
import Button from "@mui/material/Button";
interface BlackButtonProps {
  buttonText: string;
  marg?: number;
  high?: number;
  onClick?: any;
}

function BlackButton({ buttonText, marg, high, onClick }: BlackButtonProps) {
  return (
    <Button
      sx={{
        backgroundColor: "black",
        color: "white",
        "&:hover": {
          backgroundColor: "gray", // Optional: change the color on hover
        },
        m: marg,
        height: high,
      }}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
}

export default BlackButton;
