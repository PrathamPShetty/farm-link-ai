import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import CustomerTable from "../Components/CustomerTable";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));
export default function Customers() {
  const { allCustomers, getAllCustomers, updateCustomerStatus, state, host } =
    useContext(AdminContext);
  useEffect(() => {
    getAllCustomers();
  }, [state]);
  // console.log(allCategories);
  const filtered = allCustomers?.slice().reverse();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Item sx={{ p: 5, borderRadius: "20px" }}>
            <Typography variant="subtitle1" color="text.secondary">
              Registered customers
            </Typography>
            <CustomerTable
              data={filtered}
              host={host}
              updateCustomerStatus={updateCustomerStatus}
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
