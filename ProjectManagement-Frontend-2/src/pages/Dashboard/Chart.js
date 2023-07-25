import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    dept: "Page A",
    totalProjects:4000,
    closedProjects: 2400,
    // amt: 2400,
  },
  {
    dept: "Page B",
    totalProjects:3000,
    closedProjects: 1398,
    // amt: 2210,
  },
  {
    dept: "Page C",
    totalProjects:2000,
    closedProjects: 9800,
    // amt: 2290,
  },
  {
    dept: "Page D",
    totalProjects:2780,
    closedProjects: 3908,
    // amt: 2000,
  },
  {
    dept: "Page E",
    totalProjects:1890,
    closedProjects: 4800,
    // amt: 2181,
  },
];

const DeptBarChart = ({data}) => {
  const demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  return (
    <ResponsiveContainer width="100%" height="100%"  key={new Date().getTime()}>
      <BarChart
        data={data}
        key={new Date().getTime()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dept" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar displayName="Total" dataKey="totalProjects" fill="#005aa8" />
        <Bar displayName="Closed" dataKey="closedProjects" fill="#5aa546" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DeptBarChart;
