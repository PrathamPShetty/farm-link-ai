import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import React from "react";
import NewPost from "../Components/Products/Posts/NewPost";
import PostTable from "../Components/Products/Posts/PostTable";
import { useContext } from "react";
import { FarmerContext } from "../Context/Context";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));
export default function Posts() {
  const { id } = useParams();
  const { getProductPortFolio, productPortFolio, host } =
    useContext(FarmerContext);
  useEffect(() => {
    getProductPortFolio(id);
  }, []);
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
                  Product Portfolio of {productPortFolio?.product?.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <NewPost productId={id} />
                </Box>
              </Box>
              <PostTable
                productId={id}
                host={host}
                posts={productPortFolio?.posts}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
