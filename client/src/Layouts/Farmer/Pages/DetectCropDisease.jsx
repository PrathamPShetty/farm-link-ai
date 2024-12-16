import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import React from "react";
import Result from "../Components/Crop-Disease/Result";
import Form from "../Components/Crop-Disease/Form";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));
export default function DetectCropDisease() {
  return (
    <Box>
      <Box sx={{ flexGrow: 1, p: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Item
              elevation={0}
              sx={{
                p: 5,
                borderRadius: "10px",
              }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="text.secondary" variant="body2">
                  Detect Crop Disease
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Result />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Form />
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
