import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { FarmerContext } from "../../Context/Context";
import { useEffect } from "react";

export default function CropRecommendationForm() {
  const {
    cropDiseaseDetection,
    buttonDisable,
    setCropDisease,
    setButtonDisable,
    setLoading,
  } = useContext(FarmerContext);
  const [formData, setFormData] = useState({
    image: null, // Initialize as null for proper file handling
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setButtonDisable(false);
    setCropDisease(null);
    setFormData({ image: null });
    setErrors({});
  }, []);

  // Handle change for file input
  const handleChange = (e) => {
    const { name, files } = e.target;

    // Update formData with the selected file
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));

    // Clear error if a valid file is selected
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: files[0] ? "" : "This field is required",
    }));
  };

  // Validate the form
  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.image) {
      valid = false;
      newErrors.image = "This field is required";
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const Data = new FormData();
      Data.append("image", formData.image);

      // Call the context function to handle API submission
      cropDiseaseDetection(Data);
    } else {
      toast.warning("Validation failed! Fill all fields.");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Image Upload Field */}
          <Grid xs={12} sm={12} md={6} item>
            <TextField
              label="Upload picture"
              name="image"
              onChange={handleChange}
              type="file"
              InputLabelProps={{ shrink: true }}
              fullWidth
              variant="outlined"
              error={!!errors.image}
              helperText={errors.image}
            />
          </Grid>
          {/* Buttons */}
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
                width: { xs: "100%", md: "50%" },
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
                  image: null,
                });
                setCropDisease(null);
                setButtonDisable(false);
                setLoading(false);
              }}
            >
              Clear All
            </Button>
            <Button
              sx={{
                p: 1,
                width: { xs: "100%", md: "50%" },
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
          {formData?.image && (
            <Grid
              xs={12}
              sm={12}
              md={6}
              item
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box>
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      //   marginTop: "10px",
                    }}
                  />
                </Box>
                <Typography variant="caption" color="textSecondary">
                  File Name: {formData.image.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  File Size: {(formData.image.size / 1024).toFixed(2)} KB
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </form>
    </Box>
  );
}
