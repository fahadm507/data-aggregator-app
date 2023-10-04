import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const BarChartComponent = ({ data }) => {
  // Aggregate data by grade
  const aggregatedData = data.reduce((acc, curr) => {
    const grade = curr.grade;
    const balance = parseFloat(curr.currentBalance);
    const existing = acc.find((item) => item.grade === grade);
    if (existing) {
      existing.balance += balance;
    } else {
      acc.push({ grade, balance });
    }
    return acc;
  }, []);

  // Filter out objects with undefined grade or 0 balance
  const filteredData = aggregatedData.filter(item => item.grade && item.balance > 0)

  // Sort data by grade and then by balance
  filteredData.sort((a, b) => {
    if (a.grade < b.grade) return -1;
    if (a.grade > b.grade) return 1;
    return a.balance - b.balance;
  });

  return (
    <BarChart
      width={600}
      height={300}
      data={filteredData}
      margin={{
        top: 20,
        right: 30,
        left: 40,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="grade"
      />
      <YAxis />
      <Tooltip />
      <Bar dataKey="balance" fill="#855ffc" />
    </BarChart>
  );
};

export default BarChartComponent;
