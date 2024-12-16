import React from "react";
import { Container, Grid, Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import bannerImg from "../../Assets/banner.jpg"; // Adjust the path as necessary
import banner1Img from "../../Assets/banner-1.jpg"; // Adjust the path as necessary
import banner2Img from "../../Assets/banner-2.jpg"; // Adjust the path as necessary

const BannerSection = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${bannerImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: theme.spacing(5, 0),
  position: "relative",
  color: "white",
  backgroundAttachment: "fixed",
}));

const BannerContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5, 0),
  position: "relative",
  zIndex: 1,
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 0,
}));

const Banner = () => {
  return (
    <BannerSection>
      <Overlay />
      <Container>
        <BannerContent>
          <Grid container spacing={5}>
            <Grid item xs={12} lg={6}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <img
                    src={banner1Img}
                    alt="Banner 1"
                    className="img-fluid rounded"
                    style={{ width: "100%", borderRadius: "20px" }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ mb: 1, fontFamily: "Libre Baskerville" }}
                  >
                    We Sell Fresh Vegetables
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 4, fontFamily: "Libre Baskerville" }}
                  >
                    Clita erat ipsum et lorem et sit, sed stet lorem sit clita
                    duo justo magna dolore erat amet
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <img
                    src={banner2Img}
                    alt="Banner 2"
                    className="img-fluid rounded"
                    style={{ width: "100%", borderRadius: "20px" }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ mb: 1, fontFamily: "Libre Baskerville" }}
                  >
                    We Deliver Directly From The Farmers
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mb: 4, fontFamily: "Libre Baskerville" }}
                  >
                    Clita erat ipsum et lorem et sit, sed stet lorem sit clita
                    duo justo magna dolore erat amet
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </BannerContent>
      </Container>
    </BannerSection>
  );
};

export default Banner;
