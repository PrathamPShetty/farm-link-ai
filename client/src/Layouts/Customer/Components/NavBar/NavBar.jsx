import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { CustomerContext } from "../../Context/Context";
import { useEffect } from "react";
import Badge from "@mui/material/Badge";

const NavBar = () => {
  const { customer, activeNavOption, handleLogoutCustomer, cart } =
    useContext(CustomerContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navOptions = [
    { title: "Home", path: "/" },
    { title: "About", path: "/About" },
    { title: "Contact", path: "/Contact" },
    { title: "Products", path: "/Products" },
  ];
  // console.log(customer);
  return (
    <AppBar
      elevation={scrollPosition > 10 ? 1 : 0}
      sx={{
        backgroundColor: scrollPosition > 10 ? "white" : "transparent",
        transition: "0.9s ease",
        p: 2,
        position: "fixed",
        top: 0,
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "bold",
              }}
            >
              <span
                style={{
                  color: "#404a3d",
                  fontWeight: "1000",
                  fontSize: "35px",
                }}
              >
                FarmLink AI
              </span>
            </Link>
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              //   backgroundColor: "red",
              width: "50%",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            {navOptions.map((option, index) => (
              <Link
                key={index}
                to={option?.path}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                style={{
                  textDecoration: "none",
                  color: "#404a3d",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    transition: "0.5s ease",
                    "&:hover": {
                      color: "#eddd5e",
                      // backgroundColor: "#ffffff91",
                      p: 1,
                    },
                  }}
                >
                  {option?.title}
                </Box>
              </Link>
            ))}
            {customer && (
              <>
                {/* <Link
                  to={"/Profile"}
                  spy={true}
                  offset={-70}
                  duration={500}
                  className="nav-link"
                  style={{
                    textDecoration: "none",
                    color:
                      activeNavOption == "/Profile" ? "#eddd5e" : "#404a3d",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      transition: "0.5s ease",
                      "&:hover": {
                        color: "#eddd5e",
                        // backgroundColor: "#404a3d",
                        p: 1,
                      },
                    }}
                  >
                    Profile
                  </Box>
                </Link> */}
                <Link
                  to={"/Orders"}
                  spy={true}
                  offset={-70}
                  duration={500}
                  className="nav-link"
                  style={{
                    textDecoration: "none",
                    color: activeNavOption == "/Orders" ? "#eddd5e" : "#404a3d",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      transition: "0.5s ease",
                      "&:hover": {
                        color: "#eddd5e",
                        // backgroundColor: "#404a3d",
                        p: 1,
                      },
                    }}
                  >
                    Orders
                  </Box>
                </Link>
                <Link
                  to={"/Favorites"}
                  spy={true}
                  offset={-70}
                  duration={500}
                  className="nav-link"
                  style={{
                    textDecoration: "none",
                    color:
                      activeNavOption == "/Favorites" ? "#eddd5e" : "#404a3d",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      transition: "0.5s ease",
                      "&:hover": {
                        color: "#eddd5e",
                        // backgroundColor: "#404a3d",
                        p: 1,
                      },
                    }}
                  >
                    Favorites
                  </Box>
                </Link>
              </>
            )}
            {customer ? (
              <Box
                onClick={handleLogoutCustomer}
                component="span"
                sx={{
                  fontWeight: "bold",
                  transition: "0.5s ease",
                  color: "#404a3d",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#eddd5e",
                    // backgroundColor: "#ffffff91",
                    // p: 1,
                  },
                }}
              >
                Logout
              </Box>
            ) : (
              <Link
                to={"/Login"}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                style={{ textDecoration: "none" }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "bold",
                    transition: "0.5s ease",
                    color: "#404a3d",
                    "&:hover": {
                      color: "#eddd5e",
                      // backgroundColor: "#ffffff91",
                      // p: 1,
                    },
                  }}
                >
                  Login
                </Box>
              </Link>
            )}
          </Box>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: "none" } }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ display: { md: "none" } }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{
              fontWeight: "bold",
              "&hover": {
                color: "red",
              },
            }}
            to="home-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="nav-link"
          >
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{
              fontWeight: "bold",
              "&hover": {
                color: "red",
              },
            }}
            to="services-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="nav-link"
          >
            Services
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{
              fontWeight: "bold",
              "&hover": {
                color: "red",
              },
            }}
            to="about-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="nav-link"
          >
            About Us
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{
              fontWeight: "bold",
              "&hover": {
                color: "red",
              },
            }}
            to="why-us-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="nav-link"
          >
            Why Us
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{
              fontWeight: "bold",
              "&hover": {
                color: "red",
              },
            }}
            to="testimonials-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="nav-link"
          >
            Testimonials
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{
              fontWeight: "bold",
              "&hover": {
                color: "red",
              },
            }}
            to="blog-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="nav-link"
          >
            Blog
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link
            style={{
              fontWeight: "bold",
              "&hover": {
                color: "red",
              },
            }}
            to="contact-section"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="nav-link"
          >
            Contact
          </Link>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavBar;
