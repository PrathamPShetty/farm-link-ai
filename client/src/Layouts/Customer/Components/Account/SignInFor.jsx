import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { CustomerContext } from "../../Context/Context";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function SignInFor() {
  const { Login } = useContext(CustomerContext);
  const [formInfo, setFormInfo] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    Login(formInfo);
  };
  return (
    <Box component={"form"} onSubmit={handleSubmit} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{ textAlign: "center", fontWeight: "900", color: "#5a5a5ad9" }}
            variant="h4"
          >
            Customer Sign In
          </Typography>
        </Box>
        <Grid item xs={12}>
          <TextField
            type="email"
            required
            fullWidth
            label="Enter Email ID"
            name="email"
            onChange={(e) =>
              setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            required
            fullWidth
            label="Enter Password"
            name="password"
            onChange={(e) =>
              setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ p: 1, backgroundColor: "#717171" }}
          >
            Sign In
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "600" }}>
            Login as a{" "}
            <Link to={"/farmer/"} style={{ textDecoration: "none" }}>
              {" "}
              Farmer
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
