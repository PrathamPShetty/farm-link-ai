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
    temperature: "",
    humidity: "",
    soilMoisture: "",
    soilType: "",
    cropType: "",
    nitrogen: "",
    potassium: "",
    phosphorus: "",
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {
    setButtonDisable(false);
    setFertilizerPrediction(null);
    setFormData({
      temperature: "",
      humidity: "",
      soilMoisture: "",
      soilType: "",
      cropType: "",
      nitrogen: "",
      potassium: "",
      phosphorus: "",
    });
    setErrors({});
  }, []);

  // Soil and Crop Type options
  const soilTypes = ["Sandy", "Loamy", "Black", "Red", "Clayey"];
  const cropTypes = [
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
          {/* Temperature */}
          <Grid xs={12} sm={6} item>
            <TextField
              label="Temperature (°C)"
              placeholder="Enter temperature value"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.temperature}
              helperText={errors.temperature}
            />
          </Grid>

          {/* Humidity */}
          <Grid xs={12} sm={6} item>
            <TextField
              label="Humidity (%)"
              placeholder="Enter humidity value"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.humidity}
              helperText={errors.humidity}
            />
          </Grid>

          {/* Soil Moisture */}
          <Grid xs={12} sm={6} item>
            <TextField
              label="Soil Moisture (%)"
              placeholder="Enter soil moisture value"
              name="soilMoisture"
              value={formData.soilMoisture}
              onChange={handleChange}
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.soilMoisture}
              helperText={errors.soilMoisture}
            />
          </Grid>

          {/* Soil Type */}
          <Grid xs={12} sm={6} item>
            <TextField
              select
              label="Soil Type"
              name="soilType"
              value={formData.soilType}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={!!errors.soilType}
              helperText={errors.soilType}
            >
              {soilTypes.map((type) => (
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
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={!!errors.cropType}
              helperText={errors.cropType}
            >
              {cropTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Nitrogen */}
          <Grid xs={12} sm={6} item>
            <TextField
              label="Nitrogen (N)"
              placeholder="Enter nitrogen value"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.nitrogen}
              helperText={errors.nitrogen}
            />
          </Grid>

          {/* Potassium */}
          <Grid xs={12} sm={6} item>
            <TextField
              label="Potassium (K)"
              placeholder="Enter potassium value"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.potassium}
              helperText={errors.potassium}
            />
          </Grid>

          {/* Phosphorus */}
          <Grid xs={12} sm={6} item>
            <TextField
              label="Phosphorus (P)"
              placeholder="Enter phosphorus value"
              name="phosphorus"
              value={formData.phosphorus}
              onChange={handleChange}
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.phosphorus}
              helperText={errors.phosphorus}
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
                  temperature: "",
                  humidity: "",
                  soilMoisture: "",
                  soilType: "",
                  cropType: "",
                  nitrogen: "",
                  potassium: "",
                  phosphorus: "",
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
