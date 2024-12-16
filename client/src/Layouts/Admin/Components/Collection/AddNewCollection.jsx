import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AddNewCollection({ allFarmers, insertNewRecord }) {
  // Get the current date in the format YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [formInfo, setFormInfo] = useState({
    farmerId: null,
    collectedMilk: "",
    date: getCurrentDate(),
    currentPrice: "",
    amountGiven: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    insertNewRecord(formInfo);
    setFormInfo({
      farmerId: null,
      collectedMilk: "",
      date: getCurrentDate(),
      currentPrice: "",
      amountGiven: "",
    });
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select farmer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formInfo?.farmerId}
              label="Select farmer"
              name="farmerId"
              required
              onChange={(e) =>
                setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
              }
            >
              {allFarmers?.length > 0 ? (
                allFarmers?.map((item, index) => (
                  <MenuItem key={index} value={item?._id}>
                    {item?.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={null}>No farmers available</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Choose date"
            type="date"
            name="date"
            value={formInfo.date}
            InputLabelProps={{ shrink: true }}
            inputProps={{ max: getCurrentDate() }} // Restrict the max date to today
            required
            onChange={(e) =>
              setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Enter Current price per liter"
            name="currentPrice"
            type="number"
            value={formInfo.currentPrice}
            required
            onChange={(e) =>
              setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Enter collected milk in liters"
            name="collectedMilk"
            type="number"
            value={formInfo.collectedMilk}
            required
            onChange={(e) =>
              setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Enter amount given to the farmer"
            name="amountGiven"
            type="number"
            value={formInfo.amountGiven}
            required
            onChange={(e) =>
              setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              p: 1,
              backgroundColor: "#404a3d",
              ":hover": {
                backgroundColor: "#eddd5e",
                color: "#404a3d",
                fontWeight: "600",
              },
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
