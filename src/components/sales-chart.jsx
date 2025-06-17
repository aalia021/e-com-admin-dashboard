import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", sales: 120000 },
  { month: "Feb", sales: 150000 },
  { month: "Mar", sales: 100000 },
  { month: "Apr", sales: 170000 },
  { month: "May", sales: 140000 },
];

const SalesChart = () => {
  const formatCurrencyIN = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const formatNumberIN = (value) =>
    new Intl.NumberFormat("en-IN").format(value);

  return (
    <div
      className="bg-white p-3 shadow-sm"
      style={{
        border: "2px solid #1976d2", // full blue border
        borderRadius: 8, // soft corners
      }}
    >
      <h6 className="mb-3">Sales in Last 6 Months</h6>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={formatNumberIN} />
          <Tooltip formatter={formatCurrencyIN} />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
