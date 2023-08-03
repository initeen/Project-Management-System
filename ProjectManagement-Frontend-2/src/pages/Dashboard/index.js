import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chart from "./Chart";
import { getAPICall } from 'utils/api';

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
    borderLeft: "8px solid #005aa8",
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


const resp = {
  "statusCounters": [
      {
          "status": "Running",
          "count": 5
      },
      {
          "status": "Cancelled",
          "count": 3
      },
      {
          "status": "Closed",
          "count": 1
      },
      {
          "status": "Registered",
          "count": 1
      },
      {
          "status": "Total",
          "count": 10
      },
      {
          "status": "CloserDelay",
          "count": 3
      }
  ],
  "deptCounters": [
      {
          "dept": "Stratergy",
          "totalProjects": 1,
          "closedProjects": 0
      },
      {
          "dept": "Quality",
          "totalProjects": 2,
          "closedProjects": 0
      },
      {
          "dept": "HR",
          "totalProjects": 1,
          "closedProjects": 0
      },
      {
          "dept": "Finance",
          "totalProjects": 3,
          "closedProjects": 1
      },
      {
          "dept": "GG",
          "totalProjects": 2,
          "closedProjects": 0
      },
      {
          "dept": "GM",
          "totalProjects": 1,
          "closedProjects": 0
      }
  ]
}

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [summaryData, setSummaryData] = useState({});

  const fetchSummaryData = async () => {
    try {
      const {data} = await getAPICall("/summary");
      const statusCounts = {}
      const filteredStatusCounters = data?.statusCounters?.filter((item) => item.status !== "Running");

      setSummaryData({statusCounts: filteredStatusCounters, deptCounters: data?.deptCounters});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const statusCounts = summaryData?.statusCounts || [];
  const deptCounters = summaryData?.deptCounters || [];

  return (
    <div>
      <Paper sx={{ overflowX: "auto" }} elevation={0}>
        <Grid container direction="row" justifyContent="flex-start" spacing={2}>
          {statusCounts?.map((item) => (
            <Grid key={item.status} item className={classes.tileItem}>
              <Paper elevation={3} className={classes.tileItemPaper}>
                <Typography variant="subtitle1" gutterBottom>
                  {item.status}
                </Typography>
                <Typography
                  className={classes.tileValue}
                  variant="h4"
                  sx={{ mt: 1 }}
                >
                  {item.count}
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
             data={deptCounters}
          />
        </Paper>
      </Grid>
    </div>
  );
}
