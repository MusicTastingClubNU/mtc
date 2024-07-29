import * as React from "react";
import Checkbox from "@mui/material/Checkbox";

interface ControlledCheckboxProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

export default function ControlledCheckbox({
  checked,
  setChecked,
}: ControlledCheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
      sx={{
        color: "lightgray",
        "&.Mui-checked": {
          color: "lightgray",
        },
      }}
    />
  );
}
