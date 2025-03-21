import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Tabs,
  Tab,
  Box,
  TextField,
  Avatar,
  Paper,
  Tooltip,
} from "@mui/material";
import {
  Star as StarIcon,
  Search as SearchIcon,
  ShoppingBag as ShoppingBagIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CustomerContext } from "../../Context/Context";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
const SingleProductData = ({ product, posts, host, farmer, isFavorite }) => {
  const { customer, manageFavorite } = useContext(CustomerContext);
  return (
    <Container maxWidth="lg" sx={{ py: 5, mt: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                sx={{
                  // backgroundImage: `url(${host}/uploads/customer/getImagesOfProduct/${product?.picture})`,
                  height: { xs: "40vh", sm: "60vh" },
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <CardMedia
                  component="img"
                  image={`${host}/uploads/customer/getImagesOfProduct/${product?.picture}`}
                  alt="Broccoli"
                  sx={{ height: "100%", objectFit: "cover", width: "100%" }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product?.title}
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom>
                ₹{product?.price}{" "}
                <span
                  component={Typography}
                  variant="caption"
                  style={{ fontSize: "14px" }}
                >
                  / {product?.unit} {product?.unitOfMeasure}
                </span>
              </Typography>
              <Grid item xs={12} md={12} sx={{ py: 2 }}>
                <Typography color={"text.secondary"} variant="subtitle2">
                  Farmer Info
                </Typography>
                <Paper
                  elevation={2}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    p: 2,
                    borderRadius: "10px",
                  }}
                >
                  <Box>
                    <Avatar
                      src={`${host}/uploads/customer/getImagesFromFarmer/${farmer?.profile}`}
                      sx={{ width: 60, height: 60 }}
                    />
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography color={"text.secondary"} variant="subtitle2">
                      {farmer?.name}
                    </Typography>

                    {customer ? (
                      <Typography color={"text.secondary"} variant="caption">
                        {farmer?.phone}
                      </Typography>
                    ) : (
                      <Tooltip title="Login to get contact number" arrow>
                        <Typography color={"text.secondary"} variant="caption">
                          {farmer?.phone
                            ? `${farmer.phone.slice(0, 2)}${"*".repeat(
                                farmer.phone.length - 4
                              )}${farmer.phone.slice(-2)}`
                            : ""}
                        </Typography>
                      </Tooltip>
                    )}
                  </Box>
                </Paper>
              </Grid>
              {customer ? (
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    p: 1,
                    mb: 1,
                    backgroundColor: "#404a3d",
                    "&:hover": {
                      backgroundColor: "#404a3d",
                    },
                  }}
                  onClick={() => manageFavorite(product?._id)}
                  startIcon={
                    isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                  }
                >
                  {isFavorite ? "Remove from favorite" : "Add to favorite"}
                </Button>
              ) : (
                <Button
                  component={Link}
                  to={`/Login`}
                  fullWidth
                  variant="contained"
                  sx={{
                    p: 1,
                    mb: 1,
                    backgroundColor: "#404a3d",
                    "&:hover": {
                      backgroundColor: "#404a3d",
                    },
                  }}
                  startIcon={<FavoriteBorderIcon />}
                >
                  Add to favorite
                </Button>
              )}
              {customer ? (
                <Button
                  component={Link}
                  to={`/order-product/${product?._id}`}
                  fullWidth
                  variant="contained"
                  sx={{
                    p: 1,
                    backgroundColor: "#eddd5e",
                    "&:hover": {
                      backgroundColor: "#eddd5e",
                    },
                  }}
                  startIcon={<ShoppingCartIcon />}
                >
                  Order
                </Button>
              ) : (
                <Button
                  component={Link}
                  to={`/Login`}
                  fullWidth
                  variant="contained"
                  sx={{
                    p: 1,
                    backgroundColor: "#eddd5e",
                    "&:hover": {
                      backgroundColor: "#eddd5e",
                    },
                  }}
                  startIcon={<ShoppingCartIcon />}
                >
                  Order
                </Button>
              )}
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2" paragraph>
                {product?.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        mt={5}
        sx={{ fontWeight: "600" }}
      >
        Related posts
      </Typography>
      <Box sx={{ display: "flex", overflow: "auto" }}>
        {posts?.map((product, index) => (
          <Card
            elevation={0}
            key={index}
            sx={{
              width: 300,
              height: 200,
              m: 1,
              transition:
                "height 1.1s ease-in-out, background-color 0.9s ease-in",
              ":hover": {
                backgroundColor: "#404a3d1c",
                height: "100%",
              },
            }}
          >
            <CardMedia
              component="img"
              image={`${host}/uploads/customer/getImagesOfProduct/${product?.picture}`}
              alt={product?.title}
              sx={{ height: 200 }}
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="body1">{product?.subTitle}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default SingleProductData;
