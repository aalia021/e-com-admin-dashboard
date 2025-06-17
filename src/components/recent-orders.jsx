import React, { useMemo } from "react";

// MUI
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { generateMockOrders } from "./utils/mockOrders";

// Utils
const formatCurrencyIN = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
const columnsOrders = [
  { field: "id", headerName: "Order ID", width: 100 },
  { field: "customer", headerName: "Customer", flex: 1, minWidth: 150 },
  {
    field: "amount",
    headerName: "Amount",
    width: 120,
    type: "number",
    valueFormatter: (params) => {
      return formatCurrencyIN(params);
    },
  },
  { field: "date", headerName: "Date", width: 130 },
  { field: "status", headerName: "Status", width: 120 },
];

const RecentOrdersTable = () => {
  const rows = useMemo(() => generateMockOrders(20), []);

  return (
    <Box
      className="bg-white p-3 rounded shadow-sm"
      sx={{
        border: "2px solid #1976d2",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Recent Orders
      </Typography>

      <Box sx={{ width: "100%", overflowX: "auto", my: 2 }}>
        <DataGrid
          rows={rows}
          columns={columnsOrders}
          autoHeight
          disableRowSelectionOnClick
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          sx={{
            "& .even": {
              bgcolor: "#ffffff",
            },
            "& .odd": {
              bgcolor: "#e3f2fd",
            },
            "& .even:hover, & .odd:hover": {
              bgcolor: "#bbdefb",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default RecentOrdersTable;
