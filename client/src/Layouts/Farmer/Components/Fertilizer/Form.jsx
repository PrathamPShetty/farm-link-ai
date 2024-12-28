import { Box, Button, Grid, TextField, MenuItem } from "@mui/material";
import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { FarmerContext } from "../../Context/Context";
import { useEffect } from "react";

export default function CropRecommendationForm() {
  const {
    recommendFertilizer,
    buttonDisable,
    setFertilizerPrediction,
    setButtonDisable,
    setLoading,
  } = useContext(FarmerContext);
  const [formData, setFormData] = useState({
    jsont: "",
    jsonh: "",
    jsonsm: "",
    jsonsoil: "",
    jsoncrop: "",
    jsonn: "",
    jsonp: "",
    jsonk: "",
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {
    setButtonDisable(false);
    setFertilizerPrediction(null);
    setFormData({
      jsont: "",
      jsonh: "",
      jsonsm: "",
      jsonsoil: "",
      jsoncrop: "",
      jsonn: "",
      jsonp: "",
      jsonk: "",
    });
    setErrors({});
  }, []);

  // Soil and Crop Type options
  const jsonsoils = ["Sandy", "Loamy", "Black", "Red", "Clayey"];
  const jsoncrops = [
    "Maize",
    "Sugarcane",
    "Cotton",
    "Tobacco",
    "Paddy",
    "Barley",
    "Wheat",
    "Millets",
    "Oil seeds",
    "Pulses",
    "Ground Nuts",
  ];

  // Handle change for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error for the current field if it has a value
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "" ? "This field is required" : "",
    }));
  };

  // Validate all fields
  const validate = () => {
    let valid = true;
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === "") {
        valid = false;
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Format data as { features: [...] }
      const features = Object.values(formData).map(
        (val) => (isNaN(val) ? val : Number(val)) // Convert numerical fields to numbers
      );
      const submissionData = { features };
      recommendFertilizer(submissionData);
    } else {
      toast.warning("Validation failed! Fill all fields.");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* jsont */}
          <Grid xs={12} sm={6} item>
            <TextField
              label="jsont (°C)"
              placeholder="Enter jsont value"
              name="jsont"
              value={formData.jsont}
              onChange={handleChange}
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.jsont}
              helperText={errors.jsont}
            />
          </Grid>

          {/* jsonh */}
          <Grid xs={12} sm={6} item>
            <TextField
              label="jsonh (%)"
              placeholder="Enter jsonh value"
              name="jsonh"
              value={formData.jsonh}
              onChange={handleChange}
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.jsonh}
              helperText={errors.jsonh}
            />
          </Grid>

          {/* Soil Moisture */}
          <Grid xs={12} sm={6} item>
            <TextField
              label="Soil Moisture (%)"
              placeholder="Enter soil moisture value"
              name="jsonsm"
              value={formData.jsonsm}
              onChange={handleChange}
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.jsonsm}
              helperText={errors.jsonsm}
            />
          </Grid>

          {/* Soil Type */}
          <Grid xs={12} sm={6} item>
            <TextField
              select
              label="Soil Type"
              name="jsonsoil"
              value={formData.jsonsoil}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={!!errors.jsonsoil}
              helperText={errors.jsonsoil}
            >
              {jsonsoils.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Crop Type */}
          <Grid xs={12} sm={6} item>
            <TextField
              select
              label="Crop Type"
              name="jsoncrop"
              value={formData.jsoncrop}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={!!errors.jsoncrop}
              helperText={errors.jsoncrop}
            >
              {jsoncrops.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* jsonn */}
          <Grid xs={12} sm={6} item>
            <TextField
              label="jsonn (N)"
              placeholder="Enter jsonn value"
              name="jsonn"
              value={formData.jsonn}
              onChange={handleChange}
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.jsonn}
              helperText={errors.jsonn}
            />
          </Grid>

          {/* jsonp */}
          <Grid xs={12} sm={6} item>
            <TextField
              label="jsonp (K)"
              placeholder="Enter jsonp value"
              name="jsonp"
              value={formData.jsonp}
              onChange={handleChange}
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.jsonp}
              helperText={errors.jsonp}
            />
          </Grid>

          {/* jsonk */}
          <Grid xs={12} sm={6} item>
            <TextField
              label="jsonk (P)"
              placeholder="Enter jsonk value"
              name="jsonk"
              value={formData.jsonk}
              onChange={handleChange}
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.jsonk}
              helperText={errors.jsonk}
            />
          </Grid>

          {/* Buttons */}
          <Grid
            xs={12}
            sm={12}
            md={12}
            item
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              sx={{
                p: 1,
                width: { xs: "50%", md: "24%" },
                backgroundColor: "#404a3d",
                "&:hover": {
                  backgroundColor: "#404a3d",
                },
              }}
              type="reset"
              variant="contained"
              color="error"
              onClick={() => {
                setErrors({});
                setFormData({
                  jsont: "",
                  jsonh: "",
                  jsonsm: "",
                  jsonsoil: "",
                  jsoncrop: "",
                  jsonn: "",
                  jsonp: "",
                  jsonk: "",
                });
                setFertilizerPrediction(null);
                setButtonDisable(false);
                setLoading(false);
              }}
            >
              Clear All
            </Button>
            <Button
              sx={{
                p: 1,
                width: { xs: "50%", md: "24%" },
                backgroundColor: "#eddd5e",
                "&:hover": {
                  backgroundColor: "#eddd5e",
                },
              }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={buttonDisable}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
