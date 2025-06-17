import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Avatar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductFormModal from "../components/ProductFormModal";

const generateId = (() => {
  let id = 1;
  return () => id++;
})();

export default function ProductManagementPage() {
  const [products, setProducts] = useState(() => [
    {
      id: generateId(),
      title: "Wireless Mouse",
      price: 899,
      stock: 120,
      description: "Ergonomic wireless mouse with 2.4 GHz dongle.",
      imageUrl: "https://via.placeholder.com/48",
    },
    {
      id: generateId(),
      title: "Mechanical Keyboard",
      price: 4299,
      stock: 60,
      description: "RGB backlit mechanical keyboard (blue switches).",
      imageUrl: "https://via.placeholder.com/48",
    },
  ]);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const rows = useMemo(() => {
    if (!search.trim()) return products;
    const lower = search.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
  }, [products, search]);

  const columns = [
    {
      field: "imageUrl",
      headerName: "Image",
      width: 90,
      sortable: false,
      renderCell: (params) => (
        <Avatar alt={params.row.title} src={params.value} variant="rounded" />
      ),
    },
    { field: "title", headerName: "Title", flex: 1, minWidth: 150 },
    {
      field: "price",
      headerName: "Price (₹)",
      width: 120,
      type: "number",
    },
    { field: "stock", headerName: "Stock", width: 100, type: "number" },
    {
      field: "actions",
      headerName: "Actions",
      width: 110,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)} size="small">
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.id)} size="small">
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];

  // ──────────────────────────────────────────────────────────────────────
  // CRUD Helpers
  // ──────────────────────────────────────────────────────────────────────
  const handleAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = (product) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? product : p));
      }
      return [...prev, { ...product, id: generateId() }];
    });
    setModalOpen(false);
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Product Management
      </Typography>

      {/* Toolbar */}
      <Box
        my={2}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
      >
        <TextField
          label="Search products…"
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1, maxWidth: 400 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Add Product
        </Button>
      </Box>

      {/* DataGrid */}
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      </Box>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <ProductFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          product={editingProduct}
        />
      )}
    </Box>
  );
}
