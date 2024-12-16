import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { CustomerContext } from "../../Context/Context";
import { useContext } from "react";

export default function FavoriteProducts({ host, favorites }) {
  const { customer, manageFavorite } = useContext(CustomerContext);

  return (
    <Paper sx={{ p: 2, display: "flex", justifyContent: "flex-start", gap: 2 }}>
      <Box>
        <Avatar
          src={`${host}/uploads/customer/getImagesOfProduct/${favorites?.product?.picture}`}
          sx={{ width: 100, height: 100 }}
          variant="square"
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Typography
            component={Link}
            to={`/SingleProduct/${favorites?.product?._id}`}
            variant="subtitle1"
            color={"text.secondary"}
            sx={{
              textDecoration: "none",
              fontWeight: 600,
              transition: "0.5s ease",
              "&:hover": {
                color: "#eddd5e",
              },
            }}
          >
            {favorites?.product?.title} from {favorites?.product?.farmer?.name}
          </Typography>
          <Typography variant="subtitle2" color={"text.secondary"}>
            ₹{favorites?.product?.price} /{favorites?.product?.unit}{" "}
            {favorites?.product?.unitOfMeasure}
          </Typography>
          <Button
            component={Link}
            to={`/order-product/${favorites?.product?._id}`}
            color="warning"
            size="small"
            sx={{
              float: "right",
            }}
          >
            Order
          </Button>
          <Button
            onClick={() => manageFavorite(favorites?.product?._id)}
            color="error"
            size="small"
            sx={{
              float: "right",
            }}
          >
            Remove
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
