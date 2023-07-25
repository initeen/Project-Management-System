import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
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
import { Switch, Route } from "react-router-dom";
import Chart from "./Chart";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 350,
  },
  tileItem: {
    flexGrow: 1,
  },
  tileItemPaper: {
    padding: "10px 22px",
    borderLeft: "8px solid #0096FF",
  },
  chartHeading: {
    marginTop: "25px",
    marginBottom: "17px",
  },
  tileValue: {
    fontWeight: 600,
    color: "#313131de",
  },
}));

const data = [
  { name: "Total projects", value: 50 },
  { name: "Closed projects", value: 20 },
  { name: "Running projects", value: 25 },
  { name: "Cancelled projects", value: 5 },
  { name: "Reopened projects", value: 10 },
];

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [summaryData, setSummaryData] = useState({});

  const fetchSummaryData = async () => {
    try {
      const response = await fetch("/api/summary");
      if (!response.ok) {
        throw new Error("Failed to fetch summary data");
      }
      const data = await response.json();
      setSummaryData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const statusCounts = summaryData?.statusCounts || [];
  const closedProjectsByDept = summaryData?.closedProjectsByDept || [];
  const totalProjectsByDept = summaryData?.totalProjectsByDept || [];

  return (
    <div>
      <Paper sx={{ overflowX: "auto" }} elevation={0}>
        <Grid container direction="row" justifyContent="flex-start" spacing={2}>
          {data.map((item) => (
            <Grid key={item.name} item className={classes.tileItem}>
              <Paper elevation={3} className={classes.tileItemPaper}>
                <Typography variant="subtitle1" gutterBottom>
                  {item.name}
                </Typography>
                <Typography
                  className={classes.tileValue}
                  variant="h4"
                  sx={{ mt: 1 }}
                >
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Typography variant="h6" className={classes.chartHeading}>
        Department Wise - Total Vs Closed
      </Typography>
      <Grid item xs={12} md={6} lg={6}>
        <Paper className={fixedHeightPaper}>
          <Chart
            closedProjectsByDept={closedProjectsByDept}
            totalProjectsByDept={totalProjectsByDept}
          />
        </Paper>
      </Grid>
    </div>
  );
}
