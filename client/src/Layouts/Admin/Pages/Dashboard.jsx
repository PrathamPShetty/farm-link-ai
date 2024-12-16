import { Box } from "@mui/material";
import React from "react";
import Counts from "../Components/Dashboard/Counts";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { AdminContext } from "../Context/Context";
import { useEffect } from "react";
import CustomerTable from "../Components/CustomerTable";
import TableView from "../Components/Farmer/TableView";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));
export default function Dashboard() {
  const {
    state,
    host,
    counts,
    getCounts,
    allCustomers,
    getAllCustomers,
    getAllFarmers,
    allFarmers,
  } = useContext(AdminContext);
  useEffect(() => {
    getCounts();
    getAllCustomers();
    getAllFarmers();
  }, [state]);
  console.log(counts);
  console.log(allCustomers);
  return (
    <Box>
      <Box sx={{ p: 1 }}>
        <Counts data={counts} />
      </Box>{" "}
      <Box sx={{ flexGrow: 1, p: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Item elevation={0} sx={{ p: 5, borderRadius: "20px" }}>
              <Typography color="text.secondary" variant="body2">
                Recently Registered customers
              </Typography>
              <CustomerTable
                dashboard={true}
                data={allCustomers?.slice().reverse().slice(0, 4)}
              />
            </Item>
          </Grid>
          {allFarmers?.slice().reverse().slice(0, 4)?.length > 0 && (
            <Grid item xs={12} md={6}>
              <Item elevation={0} sx={{ p: 5, borderRadius: "20px" }}>
                <Typography color="text.secondary" variant="body2">
                  Recently Registered farmers
                </Typography>
                <TableView
                  dashboard={true}
                  data={allFarmers?.slice().reverse().slice(0, 4)}
                />
              </Item>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
