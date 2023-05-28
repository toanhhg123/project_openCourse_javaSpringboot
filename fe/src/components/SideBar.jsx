import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";
import { ColorModeContext } from "../context/ColorMode";
import ClassIcon from "@mui/icons-material/Class";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import ChecklistIcon from "@mui/icons-material/Checklist";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
const SideBar = ({ isOpen, onClose }) => {
  const { toggleColorMode } = React.useContext(ColorModeContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    onClose();
  };
  return (
    <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer}>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        SIDE BAR
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton onClick={toggleColorMode}>
            <ListItemIcon>
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </ListItemIcon>
            <ListItemText
              primary={
                theme.palette.mode === "dark" ? "Light mode" : "Dark mode"
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/class")}>
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary={"Class Manager"} />
          </ListItemButton>
        </ListItem>{" "}
        <ListItem>
          <ListItemButton onClick={() => navigate("/user")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={"Users Manager"} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/courses")}>
            <ListItemIcon>
              <ChecklistIcon />
            </ListItemIcon>
            <ListItemText primary={"Courses Manager"} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/opencourse")}>
            <ListItemIcon>
              <BorderColorIcon />
            </ListItemIcon>
            <ListItemText primary={"Open Course"} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/register-course")}>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary={"register-course"} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/registered-course")}>
            <ListItemIcon>
              <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText primary={"registered-course"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideBar;
