import React from "react";

// MUI
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

// Icons
import MenuIcon from "@mui/icons-material/Menu";

const Topbar = ({ toggleDrawer, isMobile }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar className="d-flex justify-content-between">
        {isMobile && (
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div">
          Admin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
