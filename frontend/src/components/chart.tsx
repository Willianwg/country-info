import React from "react";
import { Paper, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PopulationData {
  population: {
    year: number;
    value: number;
  }[];
}

const PopulationChart: React.FC<PopulationData> = ({ population }) => {
  const formatYAxis = (value: number) => {
    return value.toLocaleString(); // Adiciona separador de milhares
  };
  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Population Over Time
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={population}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip formatter={(value: any) => value.toLocaleString()} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default PopulationChart;
