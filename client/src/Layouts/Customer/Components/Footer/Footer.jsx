import React from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Twitter, Facebook, YouTube, LinkedIn } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CustomerContext } from "../../Context/Context";

const Footer = () => {
  const { customer } = useContext(CustomerContext);
  return (
    <Box sx={{ backgroundColor: "#404a3d", color: "white", py: 5 }}>
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "bold",
                }}
              >
                <span
                  style={{
                    color: "#fff",
                    fontWeight: "1000",
                    fontSize: "35px",
                  }}
                >
                  FarmLink AI
                </span>
              </Link>
            </Typography>

            {/* Tagline */}
            <Typography
              sx={{
                fontFamily: "Libre Baskerville",
                fontStyle: "italic",
                // marginTop: 2,
                fontSize: "18px",
              }}
              variant="caption"
            >
              Empowering Farmers, Connecting Communities
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "600", fontFamily: "Libre Baskerville" }}
              gutterBottom
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link
                to={"/"}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontFamily: "Libre Baskerville",
                }}
              >
                Home
              </Link>
              <Link
                to={"/About"}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontFamily: "Libre Baskerville",
                }}
              >
                About Us
              </Link>
              <Link
                to={"/Products"}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontFamily: "Libre Baskerville",
                }}
              >
                Our Products
              </Link>
              {!customer ? (
                <Link
                  to={"/Login"}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontFamily: "Libre Baskerville",
                  }}
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    to={"/Orders"}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontFamily: "Libre Baskerville",
                    }}
                  >
                    Orders
                  </Link>
                </>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="body1"
              sx={{ fontWeight: "600", fontFamily: "Libre Baskerville" }}
              gutterBottom
            >
              Stay Connected
            </Typography>
            <Typography
              sx={{ fontFamily: "Libre Baskerville" }}
              variant="body2"
            >
              Follow us on social media
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <IconButton
                href="https://twitter.com"
                sx={{ color: "white" }}
                target="_blank"
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://facebook.com"
                sx={{ color: "white" }}
                target="_blank"
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://youtube.com"
                sx={{ color: "white" }}
                target="_blank"
              >
                <YouTube />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                sx={{ color: "white" }}
                target="_blank"
              >
                <LinkedIn />
              </IconButton>
            </Box>

            {/* If you want to display other details instead of business hours */}
            <Typography
              sx={{ fontFamily: "Libre Baskerville", mt: 3 }}
              variant="body1"
            >
              Need help? Contact us at support@farmlink.ai
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
