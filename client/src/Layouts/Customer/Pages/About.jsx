import { Box, CssBaseline } from "@mui/material";
import React from "react";
import AboutUs from "../Components/Home/AboutUs";
import PageBanner from "../Banner/PageBanner";
import Reasons from "../Components/Home/Reasons";
import Banner from "../Components/Home/Banner";

export default function About() {
  return (
    <Box>
      <CssBaseline />
      <Box>
        <PageBanner title="About Us" />
      </Box>
      <Box>
        <AboutUs />
      </Box>
      <Box>
        <Banner />
      </Box>
      <Box>
        <Reasons />
      </Box>
    </Box>
  );
}
