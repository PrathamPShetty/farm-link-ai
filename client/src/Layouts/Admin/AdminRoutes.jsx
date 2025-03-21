import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Context from "./Context/Context";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Navbar from "./Components/NavBar/Navbar";
import Farmers from "./Pages/Farmers";
import Customers from "./Pages/Customers";
import Feedbacks from "./Pages/Feedbacks";

export default function AdminRoutes() {
  const { pathname } = useLocation();
  return (
    <Context>
      <Box sx={{ display: "flex", backgroundColor: "#f5f7fa" }}>
        {pathname != "/admin/" && pathname != "/admin" && <CssBaseline />}
        {pathname != "/admin/" && pathname != "/admin" && <Navbar />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: "#f5f7fa",
            p: pathname != "/admin/" && pathname != "/admin" ? 1 : 0,
          }}
        >
          {pathname != "/admin/" && pathname != "/admin" && <Toolbar />}
          <Box
            sx={{
              backgroundColor: "#f5f7fa",
              minHeight: "100vh",
              p: pathname != "/admin/" && pathname != "/admin" ? 1 : 0,
            }}
          >
            <Box sx={{}}>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/Dashboard" element={<Dashboard />} />
                <Route exact path="/Farmers" element={<Farmers />} />
                <Route exact path="/Customers" element={<Customers />} />
                <Route exact path="/Feedbacks" element={<Feedbacks />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Box>
    </Context>
  );
}
