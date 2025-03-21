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
import noProduct from "../../Assets/noProduct.webp";
import { Link } from "react-router-dom";
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

const ProductContainer = ({ products, host, search, customer, addToCart }) => {
  return (
    <Box py={5}>
      <Container>
        <Grid
          container
          spacing={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {products?.length > 0 ? (
            products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ProductItem
                  className="wow fadeInUp"
                  data-wow-delay={`${0.1 + index * 0.2}s`}
                  style={{
                    visibility: "visible",
                    animationDelay: `${0.1 + index * 0.2}s`,
                    animationName: "fadeInUp",
                  }}
                >
                  <img
                    src={`${host}/uploads/customer/getImagesOfProduct/${product?.picture}`}
                    alt={product?.title}
                    style={{
                      width: "100%",
                      height: "30vh",
                      objectFit: "cover",
                    }}
                  />
                  <Box className="product-overlay">
                    <IconButton
                      component={Link}
                      to={`/SingleProduct/${product?._id}`}
                    >
                      <LinkIcon style={{ color: "white" }} />
                    </IconButton>
                  </Box>
                  <Box textAlign="center" p={2}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "600" }}
                      display="block"
                    >
                      {product?.title}
                    </Typography>
                    <Typography variant="body2" display="block">
                      {product?.category}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="span"
                      color="primary"
                      mr={1}
                      sx={{ fontWeight: "600" }}
                    >
                      ₹{product?.price}
                    </Typography>
                    <Typography variant="body2" component="span">
                      {product?.unit}/{product?.unitOfMeasure}
                    </Typography>
                  </Box>
                </ProductItem>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box>
                <img src={noProduct} style={{ width: "100%" }} alt="nodata" />
              </Box>
              <Box>
                {search != "" ? (
                  <Typography sx={{ fontWeight: "600" }} variant="body2">
                    No product found for your search <mark>{search}</mark>!
                  </Typography>
                ) : (
                  <Typography sx={{ fontWeight: "600" }} variant="body2">
                    No products are available!
                  </Typography>
                )}
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductContainer;
