import React from "react";
import { useContext, useState } from "react";
// import { ColorModeContext, tokens } from "../../theme";
import { ColorModeContext } from "../../theme";
import { useTheme, Box, IconButton, Typography } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
//import SearchIcon from "@mui/icons-material/Search";
import { useProSidebar } from "react-pro-sidebar";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { AuthContext } from "../../App";
import { Navigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  //const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { toggleSidebar, broken } = useProSidebar();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    <Navigate to="/" replace />;
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        {broken && (
          <IconButton
            sx={{ margin: "0 6 0 2" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
        {/* <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          p={0.2}
          borderRadius={1}
        >
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
        </Box> */}
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          onClick={handleUserClick}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6">{state.nama}</Typography>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Button
            sx={{ p: 1 }}
            color="secondary"
            disabled={false}
            variant="filled"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Popover>
      </Box>
    </Box>
  );
};

export default Topbar;
