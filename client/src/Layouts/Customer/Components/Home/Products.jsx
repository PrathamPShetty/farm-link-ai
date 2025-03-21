import React from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import LinkIcon from "@mui/icons-material/Link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import one from "../../Assets/product-1.jpg";
import two from "../../Assets/product-3.jpg";
const products = [
  {
    id: 1,
    name: "Pure Milk",
    price: 19,
    oldPrice: 29,
    image: one,
  },

  {
    id: 3,
    name: "Dairy Products",
    price: 19,
    oldPrice: 29,
    image: two,
  },
];

const ProductItem = styled(Box)(({ theme }) => ({
  position: "relative",
  "& img": {
    width: "100%",
    borderRadius: "20px",
  },
  "& .product-overlay": {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    opacity: 0,
    borderRadius: "20px",
    transition: "opacity 0.3s",
  },
  "&:hover .product-overlay": {
    opacity: 1,
  },
}));

const Products = () => {
  return (
    <Box py={5}>
      <Container>
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
            Our Dairy Products For Healthy Living
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductItem
                className="wow fadeInUp"
                data-wow-delay={`${0.1 + index * 0.2}s`}
                style={{
                  visibility: "visible",
                  animationDelay: `${0.1 + index * 0.2}s`,
                  animationName: "fadeInUp",
                }}
              >
                <img src={product.image} alt={product.name} />
                <Box className="product-overlay">
                  <IconButton
                    aria-label="link"
                    className="btn btn-square btn-secondary rounded-circle m-1"
                  >
                    <LinkIcon style={{ color: "white" }} />
                  </IconButton>
                  <IconButton
                    aria-label="cart"
                    className="btn btn-square btn-secondary rounded-circle m-1"
                  >
                    <ShoppingCartIcon style={{ color: "white" }} />
                  </IconButton>
                </Box>
                <Box textAlign="center" p={2}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "600" }}
                    display="block"
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="span"
                    color="primary"
                    mr={1}
                    sx={{ fontWeight: "600" }}
                  >
                    ₹{product.price.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="span"
                    style={{ textDecoration: "line-through" }}
                  >
                    ₹{product.oldPrice.toFixed(2)}
                  </Typography>
                </Box>
              </ProductItem>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Products;
