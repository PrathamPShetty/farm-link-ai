import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import bg from "../Assets/loginBg2.jpg";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SignInFor from "../Components/Account/SignInFor";
import SignUpForm from "../Components/Account/SignUpForm";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 5 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Login() {
  const { value, setValue } = useContext(CustomerContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        // spacing={2}
        direction="column"
        justifyContent="center"
        sx={{
          height: "100vh",
          alignItems: "center",
          backgroundImage: `url(${bg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Grid
          item
          xs={5}
          sx={{
            width: "40%",
            // height: "40vh",
            backgroundColor: "#ffffffd6",
            mr: 2,
            // borderRadius: "30px",
            backdropFilter: "blur(5px)",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab sx={{ width: "50%" }} label="Sign In" {...a11yProps(0)} />
                <Tab sx={{ width: "50%" }} label="Sign Up" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <SignInFor />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SignUpForm />
            </CustomTabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
