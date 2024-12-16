import { Box } from "@mui/material";
import React from "react";
import Counts from "../Components/Dashboard/Counts";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { FarmerContext } from "../Context/Context";
import { useEffect } from "react";
import OrderTable from "../Components/Account/OrderTable";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));
export default function Dashboard() {
  const { state, host, counts, getCounts, orders, getOrders } =
    useContext(FarmerContext);
  useEffect(() => {
    getCounts();
    getOrders();
  }, [state]);
  return (
    <Box>
      <Box sx={{ p: 1 }}>
        <Counts data={counts} />
      </Box>{" "}
      <Box sx={{ flexGrow: 1, p: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Item elevation={0} sx={{ p: 5, borderRadius: "20px" }}>
              <Typography color="text.secondary" variant="body2">
                Recent orders
              </Typography>
              <OrderTable orders={orders?.slice(0, 4)} dashboard={true} />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
