import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import {
  Menu as ProMenu,
  MenuItem as ProMenuItem,
  Sidebar as ProSidebar,
  SubMenu as ProSubMenu,
} from "react-pro-sidebar";
import { menuItems } from "../../const/menuItems";
import { useCurrentPath } from "../../lib/hooks/useCurrentPath";
import type { ICustomSidebar } from "../../model/ICustomSidebar";
import { LogoEB } from "./Logo";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const currentPath = useCurrentPath();

  const navigate = useNavigate();

  const isAnySubMenuItemActive = (subMenuItems: ICustomSidebar[]) => {
    return subMenuItems.some(({ url }) => url?.includes(window.location.hash));
  };

  const drawerWidth = 240;
  const collapsedWidth = 80;

  return (
    <ProSidebar
      style={{
        width: collapsed ? collapsedWidth : drawerWidth,
        height: "100vh",
        zIndex: 1200,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        position: "fixed",
        left: 0,
        top: 0,
      }}
      backgroundColor="#ffffff"
      collapsed={collapsed}
      toggled={true}
    >
      <ProMenu>
        <Box
          sx={{
            padding: !collapsed ? "0px 20px" : "0px",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            width: "100%",
          }}
        >
          <LogoEB collapsed={collapsed} setCollapsed={setCollapsed} />
          {!collapsed && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => setCollapsed((prev) => !prev)}
                size="small"
                sx={{ backgroundColor: "#F2F4F7" }}
              >
                <ArrowBackIosNew fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
        <Divider sx={{ mb: "22px" }} />
        {menuItems.map(({ icon, url, title, children }, index) => {
          const itemKey = url ?? title;
          return (
            <React.Fragment key={itemKey}>
              {children ? (
                <Tooltip title={title} placement="right">
                  <Box component="span">
                    <ProSubMenu
                      label={title}
                      icon={icon}
                      active={isAnySubMenuItemActive(children)}
                    >
                      {children?.map(({ icon, url, title }, subIndex) => {
                        return (
                          <Tooltip
                            title={title}
                            placement="right"
                            key={`${url || title}-${subIndex}`}
                          >
                            <Box>
                              <ProMenuItem
                                key={url || title}
                                icon={icon}
                                active={url?.includes(currentPath)}
                                onClick={() => {
                                  url ? navigate(url) : null;
                                }}
                              >
                                {title}
                              </ProMenuItem>
                            </Box>
                          </Tooltip>
                        );
                      })}
                    </ProSubMenu>
                  </Box>
                </Tooltip>
              ) : (
                <Tooltip title={title} placement="right" key={itemKey}>
                  <Box component="span">
                    <ProMenuItem
                      key={itemKey}
                      icon={icon}
                      active={url?.includes(window.location.hash)}
                      onClick={() => {
                        url ? navigate(url) : null;
                      }}
                    >
                      {title}
                    </ProMenuItem>
                  </Box>
                </Tooltip>
              )}
            </React.Fragment>
          );
        })}
      </ProMenu>
    </ProSidebar>
  );
};

export default Sidebar;
