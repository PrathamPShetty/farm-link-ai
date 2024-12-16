import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { FarmerContext } from "../Context/Context";
import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import OrderTable from "../Components/Account/OrderTable";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));
export default function Orders() {
  const { getOrders, orders, host } = useContext(FarmerContext);
  useEffect(() => {
    getOrders();
  }, []);
  // console.log(orders);
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
                  Orders
                </Typography>
              </Box>
              <OrderTable orders={orders} host={host} />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
