import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { Box } from "@mui/material";
import NavBar from "./Components/NavBar/NavBar";
import Context from "./Context/Context";
import Footer from "./Components/Footer/Footer";
import About from "./Pages/About";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import { useEffect } from "react";
import Contact from "./Pages/Contact";
import SingleProduct from "./Pages/SingleProduct";
import Favorites from "./Pages/Favorites";
import OrderProduct from "./Pages/OrderProduct";

export default function CustomerRoutes() {
  const { pathname } = useLocation();
  useEffect(() => {
    //scroll to top with smooth
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <Context>
      {pathname != "/Login" && (
        <Box>
          <NavBar />
        </Box>
      )}
      <Box sx={{ minHeight: "100vh" }}>
        <Routes>
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/Products" element={<Products />} />
          <Route exact path="/SingleProduct/:id" element={<SingleProduct />} />
          <Route exact path="/order-product/:id" element={<OrderProduct />} />
          <Route exact path="/Orders" element={<Orders />} />
          <Route exact path="/Favorites" element={<Favorites />} />
        </Routes>
      </Box>
      {pathname != "/Login" && (
        <Box>
          <Footer />
        </Box>
      )}
    </Context>
  );
}
