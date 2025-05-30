import { Box, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
// biome-ignore lint/style/useImportType: <explanation>
import React, { useState } from "react";
import Navbar from "../organisms/Navbar";
import Sidebar from "../organisms/Sidebar";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar onMenuClick={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="sidebar"
      >
        <Sidebar />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
