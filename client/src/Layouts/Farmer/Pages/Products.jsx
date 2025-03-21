import { Box, Grid, Paper, styled, TextField, Typography } from "@mui/material";
import React from "react";
import ProductForm from "../Components/Products/ProductForm";
import ProductTable from "../Components/Products/ProductTable";
import { useState } from "react";
import { useContext } from "react";
import { FarmerContext } from "../Context/Context";
import { useEffect } from "react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));
export default function Products() {
  const { getAllProducts, products, host } = useContext(FarmerContext);
  useEffect(() => {
    getAllProducts();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts =
    searchTerm != ""
      ? products?.filter((product) =>
          product?.title
            ?.toLowerCase()
            .includes(searchTerm?.toLocaleLowerCase())
        )
      : products;
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
                  Products
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <TextField
                    type="search"
                    size="small"
                    variant="standard"
                    placeholder="search products here..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                  <ProductForm />
                </Box>
              </Box>
              <ProductTable host={host} products={filteredProducts} />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
