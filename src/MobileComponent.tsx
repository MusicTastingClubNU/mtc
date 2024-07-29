import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import BlackButton from "./BlackButton1";

interface MobileMenuProps {
  handleChange: (newValue: number) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ handleChange }) => {
  // Declare state variable for the anchor element
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Function to handle menu open action
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Set the anchor element to the clicked button
  };

  // Function to handle menu close action
  const handleClose = () => {
    setAnchorEl(null); // Set the anchor element to null to close the menu
  };

  return (
    <div>
      {/* IconButton to open the menu */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleClick}
        style={{ marginLeft: "20px", marginTop: "20px", marginBottom: "-25px" }}
      >
        <MenuIcon />
      </IconButton>

      {/* Menu component anchored to the anchorEl */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {/* Menu items with onClick handlers to handle navigation */}
        <MenuItem
          onClick={() => {
            handleChange(0);
            handleClose();
          }}
        >
          <BlackButton buttonText="Home" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleChange(1);
            handleClose();
          }}
        >
          <BlackButton buttonText="Picks" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleChange(2);
            handleClose();
          }}
        >
          <BlackButton buttonText="FAQ" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleChange(3);
            handleClose();
          }}
        >
          <BlackButton buttonText="About" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleChange(4);
            handleClose();
          }}
        >
          <BlackButton buttonText="Blog" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MobileMenu;
