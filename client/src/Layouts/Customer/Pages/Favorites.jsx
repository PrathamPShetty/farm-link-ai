import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import PageBanner from "../Banner/PageBanner";
import { CustomerContext } from "../Context/Context";
import { useContext } from "react";
import { useEffect } from "react";
import FavoriteProducts from "../Components/Account/FavoriteProducts";
import nodata from "../Assets/noData.png";
import { Link } from "react-router-dom";
export default function Favorites() {
  const { favorites, viewFavorites, host } = useContext(CustomerContext);
  useEffect(() => {
    viewFavorites();
  }, []);
  return (
    <Box>
      <Box>
        <PageBanner title="Favorites" />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          sx={{
            p: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={2}
        >
          {favorites?.length > 0 ? (
            favorites?.map((favorite, index) => (
              <Grid item sm={4} xs={12} key={index}>
                <FavoriteProducts favorites={favorite} host={host} />
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img style={{ width: "350px" }} src={nodata} alt="" />
              <Typography variant="body2" color={"text.secondary"}>
                No products are added to favorite!
              </Typography>
              <Button
                component={Link}
                to={`/Products`}
                size="small"
                variant="text"
              >
                browse products
              </Button>
            </Box>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
