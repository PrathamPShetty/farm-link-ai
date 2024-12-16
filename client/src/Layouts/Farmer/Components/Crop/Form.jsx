import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { FarmerContext } from "../../Context/Context";
import { useEffect } from "react";

export default function Form() {
  const {
    recommendCrop,
    buttonDisable,
    setCropPrediction,
    setButtonDisable,
    cropPrediction,
    setLoading,
  } = useContext(FarmerContext);
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {
    setButtonDisable(false);
    setCropPrediction(null);
    setFormData({
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      temperature: "",
      humidity: "",
      ph: "",
      rainfall: "",
    });
    setErrors({});
  }, []);

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
      const features = Object.values(formData).map(Number); // Convert all values to numbers
      const submissionData = { features };
      recommendCrop(submissionData);
    } else {
      toast.warning("Validation failed! fill all fields.");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} item>
            <TextField
              label="Nitrogen (N)"
              placeholder="Enter nitrogen value here"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={!!errors.nitrogen}
              helperText={errors.nitrogen}
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <TextField
              label="Phosphorous (P)"
              placeholder="Enter phosphorus value here"
              name="phosphorus"
              value={formData.phosphorus}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={!!errors.phosphorus}
              helperText={errors.phosphorus}
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <TextField
              label="Potassium (K)"
              placeholder="Enter potassium value here"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={!!errors.potassium}
              helperText={errors.potassium}
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <TextField
              placeholder="Enter temperature value here"
              label="Temperature"
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
          <Grid xs={12} sm={6} item>
            <TextField
              placeholder="Enter humidity value here"
              label="Humidity"
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
          <Grid xs={12} sm={6} item>
            <TextField
              label="pH Value"
              placeholder="Enter pH value here"
              name="ph"
              value={formData.ph}
              onChange={handleChange}
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.ph}
              helperText={errors.ph}
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <TextField
              placeholder="Enter rainfall value here"
              label="Rainfall"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              type="number"
              fullWidth
              variant="outlined"
              error={!!errors.rainfall}
              helperText={errors.rainfall}
            />
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={6}
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
                width: { xs: "100%", sm: "50%" },
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
                  nitrogen: "",
                  phosphorus: "",
                  potassium: "",
                  temperature: "",
                  humidity: "",
                  ph: "",
                  rainfall: "",
                });
                setCropPrediction(null);
                setButtonDisable(false);
                setLoading(false);
              }}
            >
              Clear All
            </Button>
            <Button
              sx={{
                p: 1,
                width: { xs: "100%", sm: "50%" },
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
