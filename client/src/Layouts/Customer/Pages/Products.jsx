import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import PageBanner from "../Banner/PageBanner";
import ProductContainer from "../Components/Home/ProductContainer";
import Reasons from "../Components/Home/Reasons";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";
import { useEffect } from "react";
export default function Products() {
  const {
    allProducts,
    singleProduct,
    viewAllProducts,
    viewSingleProduct,
    host,
    customer,
    addToCart,
  } = useContext(CustomerContext);
  const [search, setSearch] = useState("");
  useEffect(() => {
    viewAllProducts();
  }, []);

  const filtered = allProducts?.filter((item) =>
    item?.title.toLowerCase().includes(search.toLocaleLowerCase())
  );
  return (
    <Box>
      <Box>
        <PageBanner title="Products" />
      </Box>
      <Box textAlign="center" mx="auto" maxWidth={500} mb={5}>
        <Typography
          variant="h4"
          component="p"
          sx={{ fontWeight: "900", color: "#eddd5e" }}
        >
          Our Products
        </Typography>
        <Typography
          sx={{ fontWeight: "600", color: "#404a3d" }}
          variant="h6"
          component="h1"
          gutterBottom
        >
          Our Products For Healthy Living
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "50%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search products by title here"
            inputProps={{ "aria-label": "search products here" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Box>
        <ProductContainer
          products={filtered}
          host={host}
          search={search}
          addToCart={addToCart}
          customer={customer}
        />
      </Box>
      <Box>
        <Reasons />
      </Box>
    </Box>
  );
}
