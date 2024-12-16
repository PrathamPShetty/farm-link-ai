import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/GroupsOutlined";
import Person3Icon from "@mui/icons-material/Person3";
import CategoryIcon from "@mui/icons-material/CategoryOutlined";
import FeedbackIcon from "@mui/icons-material/FeedbackOutlined";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Counts({ data }) {
  let report = [
    {
      title: "Total Customers",
      count: data?.customers ? data.customers : 0,
      icon: <GroupsIcon sx={{ fontSize: "50px", color: "#404a3d" }} />,
    },
    {
      title: "Total Corps",
      count: data?.products ? data?.products : 0,
      icon: <CategoryIcon sx={{ fontSize: "50px", color: "#404a3d" }} />,
    },
    {
      title: "Total Orders",
      count: data?.orders ? data?.orders : 0,
      icon: <Person3Icon sx={{ fontSize: "50px", color: "#404a3d" }} />,
    },
    {
      title: "Total Revenue",
      count: data?.revenue ? `₹${data?.revenue}` : 0,
      icon: <FeedbackIcon sx={{ fontSize: "50px", color: "#404a3d" }} />,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {report?.map((item, index) => (
          <Grid item xs={6} key={index}>
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                height: "100%",
                borderRight: "5px solid #404a3d",
              }}
            >
              <Box
                sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "25px",
                        fontWeight: "900",
                        // fontFamily: "Libre Baskerville",
                      }}
                    >
                      {item?.count}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                        // fontFamily: "Libre Baskerville",
                        color: "#eddd5e",
                      }}
                    >
                      {item?.title}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item?.icon}
                  {/* <GroupsIcon sx={{ fontSize: "50px", color: "#404a3d" }} /> */}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
