import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Context from "./Context/Context";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Navbar from "./Components/NavBar/Navbar";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Contact from "./Pages/Contact";
import Posts from "./Pages/Posts";
import CropRecommendation from "./Pages/CropRecommendation";
import FertilizerRecommend from "./Pages/FertilizerRecommend";
import DetectCropDisease from "./Pages/DetectCropDisease";

export default function FarmerRoutes() {
  const { pathname } = useLocation();
  return (
    <Context>
      <Box sx={{ display: "flex", backgroundColor: "#f5f7fa" }}>
        {pathname != "/farmer/" && pathname != "/farmer" && <CssBaseline />}
        {pathname != "/farmer/" && pathname != "/farmer" && <Navbar />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: "#f5f7fa",
            p: pathname != "/farmer/" && pathname != "/farmer" ? 1 : 0,
          }}
        >
          {pathname != "/farmer/" && pathname != "/farmer" && <Toolbar />}
          <Box
            sx={{
              backgroundColor: "#f5f7fa",
              minHeight: "100vh",
              p: pathname != "/farmer/" && pathname != "/farmer" ? 1 : 0,
            }}
          >
            <Box sx={{}}>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/Dashboard" element={<Dashboard />} />
                <Route exact path="/Products" element={<Products />} />
                <Route
                  exact
                  path="/Products/view-posts/:id"
                  element={<Posts />}
                />
                <Route exact path="/Orders" element={<Orders />} />
                <Route exact path="/Contact" element={<Contact />} />
                <Route
                  exact
                  path="/recommend-crop"
                  element={<CropRecommendation />}
                />
                <Route
                  exact
                  path="/recommend-fertilizer"
                  element={<FertilizerRecommend />}
                />
                <Route
                  exact
                  path="/detect-crop-disease"
                  element={<DetectCropDisease />}
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Box>
    </Context>
  );
}
