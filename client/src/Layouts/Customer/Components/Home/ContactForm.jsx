import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import { CustomerContext } from "../../Context/Context";

const ContactForm = () => {
  const { customerFeedback } = useContext(CustomerContext);
  const [formInfo, setFormInfo] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    customerFeedback(formInfo);
    setFormInfo({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Paper elevation={0} sx={{ p: 5, borderRadius: 2 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "900", color: "#eddd5e" }}
            gutterBottom
          >
            Get in touch
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Feel free to contact us. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. A voluptatibus explicabo alias ipsam amet? Quasi
            modi deserunt illum voluptatem quos.
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Enter your name"
                name="name"
                value={formInfo?.name}
                onChange={(e) =>
                  setFormInfo({ ...formInfo, name: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Enter your contact number"
                name="phone"
                value={formInfo?.phone}
                onChange={(e) =>
                  setFormInfo({ ...formInfo, phone: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                label="Enter your email id"
                name="email"
                value={formInfo?.email}
                onChange={(e) =>
                  setFormInfo({ ...formInfo, email: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Enter Subject"
                name="subject"
                value={formInfo?.subject}
                onChange={(e) =>
                  setFormInfo({ ...formInfo, subject: e.target.value })
                }
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Your Message"
                name="message"
                value={formInfo?.message}
                onChange={(e) =>
                  setFormInfo({ ...formInfo, message: e.target.value })
                }
                multiline
                rows={5}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ py: 2, backgroundColor: "#404a3d", fontWeight: "600" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ContactForm;
