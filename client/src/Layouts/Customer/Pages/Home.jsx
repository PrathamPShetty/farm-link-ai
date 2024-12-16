import { Box } from "@mui/material";
import React from "react";
import Hero from "../Components/Home/Hero";
import AboutUs from "../Components/Home/AboutUs";
import Reasons from "../Components/Home/Reasons";
import Banner from "../Components/Home/Banner";

import ProductContainer from "../Components/Home/ProductContainer";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";
import { useEffect } from "react";

export default function Home() {
  return (
    <Box>
      <Box>
        <Hero />
      </Box>
      <Box>
        <AboutUs />
      </Box>
      <Box>
        <Reasons />
      </Box>
      <Box>
        <Banner />
      </Box>
    </Box>
  );
}
