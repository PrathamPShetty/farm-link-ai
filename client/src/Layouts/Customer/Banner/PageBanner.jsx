import React from "react";
import { Container, Box, Typography, Breadcrumbs } from "@mui/material";
import { styled } from "@mui/system";
import bg from "../Assets/banner.jpg";
import { Link } from "react-router-dom";
const HeaderContainer = styled(Box)(({ theme }) => ({
  background: `url(${bg}) center center/cover no-repeat`,
  padding: theme.spacing(5, 0),
  marginBottom: theme.spacing(5),
  textAlign: "center",
  color: "white",
  animation: "fadeIn 0.1s",
  visibility: "visible",
  backgroundAttachment: "fixed",
  height: "60vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const PageBanner = ({ title }) => {
  return (
    <HeaderContainer className="wow fadeIn" data-wow-delay="0.1s">
      <Container>
        <Box py={5}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: "900" }}>
            {title}
          </Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            className="animated slideInDown"
            sx={{
              justifyContent: "center",
              display: "flex",
              mt: 2,
              color: "white",
            }}
          >
            <Link
              component={Typography}
              variant="h4"
              to="/"
              underline="hover"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Home
            </Link>
            <Typography sx={{ fontWeight: "600", color: "white" }}>
              {title}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Container>
    </HeaderContainer>
  );
};

export default PageBanner;
