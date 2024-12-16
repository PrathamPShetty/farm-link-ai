import React from "react";
import { Container, Grid, Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import experienceImg from "../../Assets/experience.png"; // Adjust the path as necessary
import awardImg from "../../Assets/award.png"; // Adjust the path as necessary
import animalImg from "../../Assets/animal.png"; // Adjust the path as necessary
import clientImg from "../../Assets/client.png"; // Adjust the path as necessary

const TextBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(5, 4),
  //   borderRadius: theme.shape.borderRadius,
}));

const Reasons = () => {
  return (
    <Box sx={{ py: 5 }}>
      <Container>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                visibility: "visible",
                animationDelay: "0.1s",
                animationName: "fadeInUp",
              }}
            >
              <Typography
                variant="h5"
                component="p"
                sx={{
                  backgroundColor: "white",
                  color: "#eddd5e",
                  display: "inline-block",
                  paddingRight: 3,
                  fontWeight: "900",
                }}
              >
                Why Us!
              </Typography>
              <Typography
                variant="h6"
                component="h1"
                sx={{ mb: 1, fontWeight: "600", color: "#404a3d" }}
              >
                Few Reasons Why People Choosing Us!
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon sx={{ color: "#404a3d", marginRight: 1 }} />
                Justo magna erat amet
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon sx={{ color: "#404a3d", marginRight: 1 }} />
                Aliqu diam amet diam et eos
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon sx={{ color: "#404a3d", marginRight: 1 }} />
                Clita erat ipsum et lorem et sit
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ borderRadius: "8px", overflow: "hidden" }}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={6}>
                  <TextBox sx={{ backgroundColor: "#5B8C51", color: "white" }}>
                    {/* <img
                      src={experienceImg}
                      alt="Experience"
                      className="img-fluid mb-4"
                      style={{ width: "50px" }}
                    /> */}
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{ mb: 0, fontWeight: "600" }}
                    >
                      5
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        color: "#eddd5e",
                      }}
                    >
                      Years Experience
                    </Typography>
                  </TextBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextBox sx={{ backgroundColor: "#eddd5e" }}>
                    {/* <img
                      src={awardImg}
                      alt="Award"
                      className="img-fluid mb-4"
                      style={{ width: "50px" }}
                    /> */}
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{ mb: 0, fontWeight: "600", color: "#404a3d" }}
                    >
                      18
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        color: "#5B8C51",
                      }}
                    >
                      Award Winning
                    </Typography>
                  </TextBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextBox sx={{ backgroundColor: "#eddd5e" }}>
                    {/* <img
                      src={animalImg}
                      alt="Animal"
                      className="img-fluid mb-4"
                      style={{ width: "50px" }}
                    /> */}
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{ mb: 0, fontWeight: "600", color: "#404a3d" }}
                    >
                      200+
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        color: "#5B8C51",
                      }}
                    >
                      Total Farmers
                    </Typography>
                  </TextBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextBox sx={{ backgroundColor: "#5B8C51", color: "white" }}>
                    {/* <img
                      src={clientImg}
                      alt="Client"
                      className="img-fluid mb-4"
                      style={{ width: "50px" }}
                    /> */}
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{ mb: 0, fontWeight: "600" }}
                    >
                      5000+
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: "600",
                        color: "#eddd5e",
                      }}
                    >
                      Happy Clients
                    </Typography>
                  </TextBox>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Reasons;
