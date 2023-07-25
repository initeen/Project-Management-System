import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { MainListItems, SecondaryListItems, LogoutListItem } from "./listItems";
import { Switch, Route } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useLocation } from "react-router-dom";

import Dashboard from "pages/Dashboard";
import ProjectList from "pages/ProjectList";
import CreateProject from 'pages/CreateProject';
import logo from 'assets/images/Logo.svg';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    display: "flex",
    justifyContent: "center",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: { ...theme.mixins.toolbar, display: "flex", },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundImage: `url('/Header-bg.svg')`,
    backgroundRepeat: "no-repeat",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  container: {
    paddingTop: theme.spacing(4),

  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function AppLayout() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const location = useLocation();

  const renderHeaderText = () => {
    switch (location.pathname) {
      case "/project/list":
        return "Project Listing";
      case "/project":
        return "Dashboard";
      case "/project/create":
        return "Create Project";
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        style={{ display: "flex", justifyContent: "center" }}
        open={false}
      >
        <List>
          <MainListItems />
        </List>
        <Divider />
        <List>
          <SecondaryListItems />
        </List>
        <List>
          <LogoutListItem />
        </List>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <div className={classes.appBarSpacer}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <ArrowBackIosIcon style={{ color: "white" }} />
              <div style={{ color: "white" }}>
                <Box style={{ fontSize: '20px' }} m={1}>
                  {renderHeaderText()}
                </Box>
              </div>
            </div>
            <div style={{marginLeft: "420px"}}>
              <img src={logo} alt="Logo"
              /></div>
          </div>
        </Container>
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route exact path="/project">
              <Dashboard />
            </Route>
            <Route path="/project/list">
              <ProjectList />
            </Route>
            <Route path="/project/create">
              <CreateProject />
            </Route>
            {/* <Route path="/logout">
              <Logout/>
              </Route> */}
          </Switch>
        </Container>
      </main>
    </div>
  );
}
