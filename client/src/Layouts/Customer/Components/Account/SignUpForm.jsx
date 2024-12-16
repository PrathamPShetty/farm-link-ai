import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { CustomerContext } from "../../Context/Context";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function SignUpForm() {
  const { Register } = useContext(CustomerContext);
  const [formInfo, setFormInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    Register(formInfo);
    setFormInfo(null);
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
            Customer Sign Up
          </Typography>
        </Box>
        <Grid item xs={12}>
          <TextField
            type="text"
            required
            fullWidth
            label="Enter your name"
            name="name"
            value={formInfo?.name}
            onChange={(e) =>
              setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="email"
            required
            fullWidth
            label="Enter Email ID"
            name="email"
            value={formInfo?.email}
            onChange={(e) =>
              setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="number"
            required
            fullWidth
            label="Enter Contact number"
            name="phone"
            value={formInfo?.phone}
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
            value={formInfo?.password}
            onChange={(e) =>
              setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ p: 1, backgroundColor: "#717171" }}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
