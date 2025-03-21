import { Box, CssBaseline } from "@mui/material";
import React from "react";
import PageBanner from "../Banner/PageBanner";
import ContactForm from "../Components/Home/ContactForm";

export default function Contact() {
  return (
    <Box>
      <CssBaseline />
      <Box>
        <PageBanner title="Contact Us" />
      </Box>
      <Box>
        <ContactForm />
      </Box>
    </Box>
  );
}
