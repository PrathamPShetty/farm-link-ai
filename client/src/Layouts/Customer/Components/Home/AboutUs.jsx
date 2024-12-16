import React from "react";
import { Container, Grid, Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import service1 from "../../Assets/banner-2.jpg"; // Adjust the path as necessary
import service2 from "../../Assets/service-2.jpg"; // Adjust the path as necessary
import service3 from "../../Assets/service-3.jpg"; // Adjust the path as necessary
import serviceIcon from "../../Assets/service.png"; // Adjust the path as necessary
import productIcon from "../../Assets/product.png"; // Adjust the path as necessary

const AboutExperience = styled(Box)({
  backgroundColor: "#eddd5e",
  borderRadius: "8px",
  padding: "16px",
  textAlign: "center",
  color: "#404a3d",
});

const AboutUs = () => {
  return (
    <Box sx={{ py: 5, p: 10 }}>
      <Container>
        <Grid container spacing={5} alignItems="end">
          <Grid item xs={12} lg={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <AboutExperience>
                  <Typography
                    variant="h1"
                    component="div"
                    sx={{ mb: 0, fontWeight: "900" }}
                  >
                    5
                  </Typography>
                  <Typography
                    variant="h6"
                    component="small"
                    sx={{ fontSize: "1.25rem", fontWeight: "bold" }}
                  >
                    Years Experience
                  </Typography>
                </AboutExperience>
              </Grid>
              <Grid item xs={6}>
                <img
                  src={service1}
                  alt="Service 1"
                  className="img-fluid rounded"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src={service2}
                  alt="Service 2"
                  className="img-fluid rounded"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={6}>
                <img
                  src={service3}
                  alt="Service 3"
                  className="img-fluid rounded"
                  style={{ width: "200px" }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography
              variant="h2"
              component="p"
              sx={{
                backgroundColor: "white",
                color: "#eddd5e",
                display: "inline-block",
                paddingRight: 3,
                fontWeight: "900",
              }}
            >
              About Us
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              sx={{ mb: 4, fontWeight: "600", color: "#404a3d" }}
            >
              Know About Farm Link AI
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
              lorem sit clita duo justo magna dolore erat amet
            </Typography>
            <Grid container spacing={5} sx={{ pt: 2, mb: 5 }}>
              <Grid item xs={12} sm={6}>
                <img
                  src={serviceIcon}
                  alt="Service Icon"
                  className="img-fluid mb-4"
                  style={{ width: "50px" }}
                />
                <Typography
                  variant="Subtitle1"
                  component="h5"
                  sx={{ color: "#404a3d" }}
                >
                  Dedicated Services
                </Typography>
                <Typography variant="caption">
                  Clita erat ipsum et lorem et sit, sed stet lorem sit clita
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <img
                  src={productIcon}
                  alt="Product Icon"
                  className="img-fluid mb-4"
                  style={{ width: "50px" }}
                />
                <Typography
                  variant="Subtitle1"
                  component="h5"
                  sx={{ color: "#404a3d" }}
                >
                  Organic Products
                </Typography>
                <Typography variant="caption">
                  Clita erat ipsum et lorem et sit, sed stet lorem sit clita
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
