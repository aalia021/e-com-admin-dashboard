import React from "react";

// Material UI
import { Card, CardContent, Typography } from "@mui/material";

const SummaryCard = ({ title, value, icon }) => {
  const Icon = icon;
  return (
    <Card
      className="d-flex align-items-center p-4 h-100 shadow-sm"
      style={{
        minHeight: 120,
        border: "2px solid #1976d2",
        borderRadius: 8,
        backgroundColor: "#fff",
      }}
    >
      <div
        className="me-4 bg-light rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: 56,
          height: 56,
          backgroundColor: "#e3f2fd",
        }}
      >
        <Icon style={{ color: "#1976d2" }} />
      </div>
      <CardContent className="p-0">
        <Typography variant="subtitle1" color="textSecondary" className="mb-1">
          {title}
        </Typography>
        <Typography variant="h5" className="fw-bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
