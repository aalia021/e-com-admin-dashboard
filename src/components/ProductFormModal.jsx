import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// helpers
const required = (val) => (!val ? "Required" : "");
const isNumber = (val) => !Number.isNaN(Number(val));

function ProductFormModal({ open, onClose, onSave, product }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [form, setForm] = useState({
    title: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(
      product ?? {
        title: "",
        price: "",
        stock: "",
        description: "",
        imageUrl: "",
      }
    );
    setImageFile(null);
  }, [product]);

  useEffect(() => {
    return () => {
      if (imageFile?.preview) URL.revokeObjectURL(imageFile.preview);
    };
  }, [imageFile]);

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImageFile({ file, preview });
    setForm({ ...form, imageUrl: preview });
  };

  const validate = () => {
    const newErrors = {
      title: required(form.title),
      price:
        required(form.price) || (!isNumber(form.price) ? "Enter a number" : ""),
      stock:
        required(form.stock) || (!isNumber(form.stock) ? "Enter a number" : ""),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    onSave(payload);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>

      <DialogContent dividers>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            {/* Title */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                value={form.title}
                onChange={handleChange("title")}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>

            {/* Price */}
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Price (₹)"
                type="number"
                value={form.price}
                onChange={handleChange("price")}
                error={!!errors.price}
                helperText={errors.price}
                inputProps={{ min: 0 }}
              />
            </Grid>

            {/* Stock */}
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Stock"
                type="number"
                value={form.stock}
                onChange={handleChange("stock")}
                error={!!errors.stock}
                helperText={errors.stock}
                inputProps={{ min: 0 }}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                minRows={3}
                value={form.description}
                onChange={handleChange("description")}
              />
            </Grid>

            {/* Upload + Avatar */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button variant="outlined" component="label">
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                {form.imageUrl && (
                  <Avatar
                    src={form.imageUrl}
                    alt="preview"
                    variant="rounded"
                    sx={{ width: 56, height: 56 }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductFormModal;
