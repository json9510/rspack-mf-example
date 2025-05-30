import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import type React from "react";
import { useRef } from "react";
import { getSessionFromStorage } from "../../lib/utils/localStorage";
import Avatar from "../atoms/Avatar";
import ModalLogout from "./ModalLogout";

type Props = {
  onMenuClick: () => void;
};

const Navbar: React.FC<Props> = () => {
  const getUserName = () => {
    const session = getSessionFromStorage();
    if (session) {
      return session.state.session.email;
    }
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const createClient = useRef<any>(null);

  const callCreateClient = () => {
    createClient.current.changeModal();
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" color="primary" sx={{ height: "70px" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
            <Box>
              <IconButton color="inherit">
                <Badge
                  color="secondary"
                  variant="dot"
                  overlap="circular"
                  invisible={true}
                />
              </IconButton>
            </Box>
            <Box className="Icon-container">
              <Avatar />
            </Box>
            <Typography
              className="Text-name-user"
              variant="subtitle1"
              noWrap
              component="div"
            >
              {getUserName() ?? "User"}
            </Typography>
            <IconButton color="inherit" onClick={callCreateClient}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <ModalLogout ref={createClient} />
    </>
  );
};

export default Navbar;
