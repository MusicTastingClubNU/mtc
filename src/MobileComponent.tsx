import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import BlackButton from "./BlackButton1";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  handleChange: (newValue: number) => void;
}

const MobileMenu = () => {
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
        {/* Menu items with onClick handlers to handle navigation. */}
        <MenuItem>
          <Link to={"/"}>
            <BlackButton buttonText="Home" />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/picks"}>
            <BlackButton buttonText="Picks" />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/faq"}>
            <BlackButton buttonText="FAQ" />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/club"}>
            <BlackButton buttonText="Club" />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/blog"}>
            <BlackButton buttonText="Blog" />
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={"/exec"}>
            <BlackButton buttonText="Exec" />
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MobileMenu;
