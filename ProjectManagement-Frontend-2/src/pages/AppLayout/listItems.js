import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import StorageOutlinedIcon from "@material-ui/icons/StorageOutlined";
import SpeedOutlinedIcon from "@material-ui/icons/SpeedOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

const useStyles = makeStyles((theme) => ({
  activeListItem: {
    backgroundColor: theme.palette.action.selected, // Change this color as desired
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export const MainListItems = () => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <div>
      <ListItem
        button
        component={Link}
        to="/project"
        className={
          location.pathname === "/project" ? classes.activeListItem : ""
        }
      >
        <ListItemIcon>
          <SpeedOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/project/list"
        className={
          location.pathname === "/project/list" ? classes.activeListItem : ""
        }
      >
        <ListItemIcon>
          <StorageOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItem>
    </div>
  );
};

export const SecondaryListItems = () => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <div>
      <ListItem
        button
        component={Link}
        to="/project/create"
        className={
          location.pathname === "/project/create" ? classes.activeListItem : ""
        }
      >
        <ListItemIcon>
          <AddOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Create Project" />
      </ListItem>
    </div>
  );
};