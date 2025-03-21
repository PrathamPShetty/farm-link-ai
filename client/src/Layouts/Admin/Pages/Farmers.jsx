import React, { useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { AdminContext } from "../Context/Context";
import TableView from "../Components/Farmer/TableView";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

export default function Farmers() {
  const { getAllFarmers, allFarmers, state, host, updateFarmerStatus } =
    useContext(AdminContext);

  useEffect(() => {
    getAllFarmers();
  }, [state]);

  const filtered = allFarmers?.slice().reverse();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Box sx={{ width: "100%" }}>
            <Item sx={{ p: 5, borderRadius: "20px" }}>
              <Typography variant="subtitle1" color="text.secondary">
                Registered farmers
              </Typography>
              <TableView
                data={filtered}
                host={host}
                updateFarmerStatus={updateFarmerStatus}
              />
            </Item>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
