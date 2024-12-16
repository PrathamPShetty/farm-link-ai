import React from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
} from "@mui/material";
import { useContext } from "react";
import { FarmerContext } from "../../Context/Context";
import { useEffect } from "react";

export default function ProductForm({ singleProduct }) {
  const { insertProduct, updateProduct } = useContext(FarmerContext);
  const [open, setOpen] = React.useState(false);
  const [formInfo, setFormInfo] = React.useState({
    title: "",
    picture: null,
    price: "",
    unit: "",
    unitOfMeasure: "",
    description: "",
    status: "",
  });

  const [formError, setFormError] = React.useState({
    title: "",
    picture: "",
    price: "",
    unit: "",
    unitOfMeasure: "",
    description: "",
    status: "",
  });

  const handleClickOpen = () => {
    if (singleProduct) {
      setFormInfo({
        title: singleProduct?.title,
        price: singleProduct?.price,
        unit: singleProduct?.unit,
        unitOfMeasure: singleProduct?.unitOfMeasure,
        description: singleProduct?.description,
        status: singleProduct?.status,
        picture: singleProduct?.picture,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormInfo({
      title: "",
      picture: null,
      price: "",
      unit: "",
      unitOfMeasure: "",
      description: "",
    });
    setFormError({
      title: "",
      picture: "",
      price: "",
      unit: "",
      unitOfMeasure: "",
      description: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormInfo({
      ...formInfo,
      [name]: name == "picture" ? files[0] : value,
    });
    setFormError({
      ...formError,
      [name]: null,
    });
  };
  const validateForm = () => {
    const errors = {};
    if (!formInfo.title) errors.title = "Title is required.";
    if (!formInfo.picture) errors.picture = "Product picture is required.";
    if (!formInfo.price || isNaN(formInfo.price) || formInfo.price <= 0)
      errors.price = "Enter a valid price.";
    if (!formInfo.unit || isNaN(formInfo.unit) || formInfo.unit <= 0)
      errors.unit = "Enter a valid unit/quantity.";
    if (!formInfo.unitOfMeasure)
      errors.unitOfMeasure = "Select a unit of measure.";
    if (!formInfo.description)
      errors.description = "Product description is required.";
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const Data = new FormData();
      Data.append("title", formInfo.title);
      Data.append("picture", formInfo.picture);
      Data.append("price", formInfo.price);
      Data.append("unit", formInfo.unit);
      Data.append("unitOfMeasure", formInfo.unitOfMeasure);
      Data.append("description", formInfo.description);
      if (singleProduct) {
        Data.append("status", formInfo.status);
        updateProduct(singleProduct?._id, Data);
      } else {
        insertProduct(Data);
      }
      handleClose();
    }
  };

  return (
    <Box>
      {singleProduct ? (
        <Button variant="text" onClick={handleClickOpen}>
          Update
        </Button>
      ) : (
        <Button variant="text" onClick={handleClickOpen}>
          Add new
        </Button>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add new product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form to add a new product
          </DialogContentText>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="title"
                  label="Product title"
                  fullWidth
                  variant="standard"
                  value={formInfo.title}
                  onChange={handleInputChange}
                  error={!!formError.title}
                  helperText={formError.title}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  margin="dense"
                  name="picture"
                  label="Product picture"
                  fullWidth
                  variant="standard"
                  type="file"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleInputChange}
                  error={!!formError.picture}
                  helperText={formError.picture}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  margin="dense"
                  name="price"
                  label="Product price"
                  fullWidth
                  type="number"
                  variant="standard"
                  value={formInfo.price}
                  onChange={handleInputChange}
                  error={!!formError.price}
                  helperText={formError.price}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  margin="dense"
                  name="unit"
                  label="Product unit/quantity"
                  fullWidth
                  type="number"
                  variant="standard"
                  value={formInfo.unit}
                  onChange={handleInputChange}
                  error={!!formError.unit}
                  helperText={formError.unit}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl
                  fullWidth
                  sx={{ mt: 1 }}
                  error={!!formError.unitOfMeasure}
                >
                  <InputLabel id="unit-select-label">
                    Unit of measure
                  </InputLabel>
                  <Select
                    labelId="unit-select-label"
                    variant="standard"
                    id="unit-select"
                    value={formInfo.unitOfMeasure}
                    name="unitOfMeasure"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={"Gram"}>Gram</MenuItem>
                    <MenuItem value={"KG"}>KG</MenuItem>
                    <MenuItem value={"Quintal"}>Quintal</MenuItem>
                    <MenuItem value={"Liter"}>Liter</MenuItem>
                    <MenuItem value={"Milliliter"}>Milliliter</MenuItem>
                    <MenuItem value={"Piece"}>Piece</MenuItem>
                    <MenuItem value={"Dozen"}>Dozen</MenuItem>
                    <MenuItem value={"Bundle"}>Bundle</MenuItem>
                    <MenuItem value={"Pack"}>Pack</MenuItem>
                    <MenuItem value={"Tray"}>Tray</MenuItem>
                    <MenuItem value={"Bunch"}>Bunch</MenuItem>
                    <MenuItem value={"Set"}>Set</MenuItem>
                    <MenuItem value={"Meter"}>Meter</MenuItem>
                    <MenuItem value={"Feet"}>Feet</MenuItem>
                  </Select>
                  <FormHelperText>{formError.unitOfMeasure}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  margin="dense"
                  name="description"
                  label="Product description"
                  fullWidth
                  multiline
                  rows={2}
                  variant="standard"
                  value={formInfo.description}
                  onChange={handleInputChange}
                  error={!!formError.description}
                  helperText={formError.description}
                />
              </Grid>
              {singleProduct && (
                <Grid item xs={12} md={12}>
                  <FormControl
                    fullWidth
                    sx={{ mt: 1 }}
                    error={!!formError.unitOfMeasure}
                  >
                    <InputLabel id="unit-select-label">Status</InputLabel>
                    <Select
                      labelId="unit-select-label"
                      variant="standard"
                      id="unit-select"
                      value={formInfo.status}
                      name="status"
                      onChange={handleInputChange}
                    >
                      <MenuItem value={"Available"}>Available</MenuItem>
                      <MenuItem value={"Unavailable"}>Unavailable</MenuItem>
                    </Select>
                    <FormHelperText>{formError.unitOfMeasure}</FormHelperText>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
