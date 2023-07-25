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
    name: "Page A",
    total: 4000,
    closed: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    total: 3000,
    closed: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    total: 2000,
    closed: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    total: 2780,
    closed: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    total: 1890,
    closed: 4800,
    amt: 2181,
  },
];

const DeptBarChart = () => {
  const demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar displayName="Total" dataKey="total" fill="#0000FF" />
        <Bar displayName="Closed" dataKey="closed" fill="#7CFC00" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DeptBarChart;
