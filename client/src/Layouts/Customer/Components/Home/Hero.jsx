import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import sliderBg1 from "../../Assets/heroBg1.jpg"; // Ensure these images exist
import sliderBg2 from "../../Assets/heroBg2.jpg";
import sliderBg3 from "../../Assets/heroBg3.jpg";
import { Link } from "react-router-dom";

const contentArray = [
  {
    background: sliderBg3,
    headline: "Fresh Produce, Direct from Local Farmers",
    description:
      "Experience the best quality produce sourced directly from local farmers. With FarmLinkAI, you can access fresh, farm-to-table products while supporting local agriculture. Our platform ensures farmers earn fair prices by eliminating middlemen, and buyers get fresh, high-quality products every time.",
  },
  {
    background: sliderBg2,
    headline: "Empowering Sustainable Farming for the Future",
    description:
      "At FarmLinkAI, we’re committed to promoting sustainable farming practices. By offering farmers data-driven insights on weather patterns and crop recommendations, we help them grow the most profitable and sustainable crops. Our goal is to work hand-in-hand with farmers to create an eco-friendly, resilient farming community.",
  },
  {
    background: sliderBg1,
    headline: "Your Trusted Marketplace for Fresh Produce",
    description:
      "FarmLinkAI offers a diverse marketplace where you can easily browse and purchase fresh produce and farming products. Whether you’re looking for dairy products, seasonal vegetables, or essential farming supplies, we ensure quality, transparency, and timely delivery—all sourced directly from local farms.",
  },
];

const Hero = () => {
  return (
    <Box
      className="slider_section"
      sx={{ position: "relative", overflow: "hidden" }}
    >
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={5000}
        showStatus={false}
        showArrows={true}
      >
        {contentArray.map((content, index) => (
          <Box key={index}>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                backgroundImage: `url(${content.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }}
            ></Box>
            <Container>
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100vh" }}
              >
                <Box sx={{ textAlign: "left", color: "#ffffffc7" }}>
                  <Typography
                    variant="h1"
                    sx={{ fontWeight: "900" }}
                    component="h1"
                    gutterBottom
                  >
                    {content.headline}
                  </Typography>
                  <Typography sx={{ color: "white" }} variant="body1" paragraph>
                    {content.description}
                  </Typography>
                  <Box
                    sx={{ mt: 3, display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      component={Link}
                      to={"/About"}
                      variant=""
                      className="btn1"
                    >
                      About Us
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default Hero;
