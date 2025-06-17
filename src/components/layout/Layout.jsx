import React, { useEffect, useState } from "react";

// Libraries
import { Outlet } from "react-router";
import { useMediaQuery, useTheme } from "@mui/material";

// Components
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

const DRAWER_WIDTH = 240;

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(isMobile);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  return (
    <div>
      {/* Topbar */}
      <Topbar toggleDrawer={toggleDrawer} isMobile={isMobile} />

      {/* Sidebar */}
      <Sidebar open={open} toggleDrawer={toggleDrawer} isMobile={isMobile} />

      {/* Main Content */}
      <main
        className="flex-grow-1 p-3 bg-light"
        style={{
          marginTop: "64px",
          minHeight: "100vh",
          transition: "margin 0.3s ease",
          ...(isMobile
            ? {}
            : {
                marginLeft: open ? `${DRAWER_WIDTH}px` : 0,
              }),
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
