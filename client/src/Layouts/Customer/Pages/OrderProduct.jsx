import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import PageBanner from "../Banner/PageBanner";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CustomerContext } from "../Context/Context";
import { useEffect } from "react";
import { useState } from "react";

export default function OrderProduct() {
  const { id } = useParams();
  const { singleProduct, viewSingleProduct, host, orderProduct } =
    useContext(CustomerContext);
  useEffect(() => {
    viewSingleProduct(id);
  }, [id]);
  const [formInfo, setFormInfo] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "1",
    address: "",
    location: "",
    city: "",
    pin: "",
    paymentMethod: "",
    total: "",
    product: singleProduct?.product,
  });
  useEffect(() => {
    setFormInfo({
      ...formInfo,
      total: singleProduct?.product?.price * formInfo?.quantity,
    });
  }, [singleProduct]);

  const [formError, setFormError] = useState({
    name: null,
    email: null,
    phone: null,
    quantity: null,
    address: null,
    location: null,
    city: null,
    pin: null,
    paymentMethod: null,
  });

  const handleChange = (e) => {
    setFormError({ ...formError, [e.target.name]: null });
    const { name, value } = e.target;

    if (name === "quantity" && Number(value) <= 0) {
      setFormError({
        ...formError,
        quantity: "Quantity must be greater than zero",
      });
      return; // Exit the function without updating state
    }

    // Update state if validation passes
    setFormInfo((prev) => {
      const updatedFormInfo = { ...prev, [name]: value };

      if (name === "quantity") {
        const quantity = parseFloat(value); // Allow decimal inputs
        const price = singleProduct?.product?.price || 0;
        updatedFormInfo.total = (quantity * price)?.toFixed(2); // Recalculate total
      }

      return updatedFormInfo;
    });
  };

  const handlePaymentChange = (e) => {
    setFormInfo((prev) => ({ ...prev, paymentMethod: e.target.value }));
    setFormError((prev) => ({ ...prev, paymentMethod: null }));
  };

  const handleSubmit = () => {
    let hasError = false;
    const errors = {};

    // Name validation
    if (!formInfo.name.trim()) {
      errors.name = "Name is required";
      hasError = true;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formInfo.email.trim()) {
      errors.email = "Email is required";
      hasError = true;
    } else if (!emailRegex.test(formInfo.email)) {
      errors.email = "Invalid email format";
      hasError = true;
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/; // Basic Indian phone number validation
    if (!formInfo.phone.trim()) {
      errors.phone = "Phone number is required";
      hasError = true;
    } else if (!phoneRegex.test(formInfo.phone)) {
      errors.phone =
        "Invalid phone number! Phone number must be 10 digits and start with 6, 7, 8, or 9";
      hasError = true;
    }

    // Quantity validation
    if (!formInfo.quantity || Number(formInfo.quantity) <= 0) {
      errors.quantity = "Quantity must be greater than zero";
      hasError = true;
    }

    // Address validation
    if (!formInfo.address.trim()) {
      errors.address = "Address is required";
      hasError = true;
    }

    // Location validation
    if (!formInfo.location.trim()) {
      errors.location = "Location is required";
      hasError = true;
    }

    // City validation
    if (!formInfo.city.trim()) {
      errors.city = "City is required";
      hasError = true;
    }

    // Pin validation
    const pinRegex = /^\d{6}$/; // Basic PIN code validation
    if (!formInfo.pin.trim()) {
      errors.pin = "PIN code is required";
      hasError = true;
    } else if (!pinRegex.test(formInfo.pin)) {
      errors.pin = "Invalid PIN code";
      hasError = true;
    }

    // Payment method validation
    if (!formInfo.paymentMethod) {
      errors.paymentMethod = "Please select a payment method";
      hasError = true;
    }

    setFormError(errors);

    if (!hasError) {
      orderProduct(formInfo);
      //   console.log("Form submitted successfully", formInfo);
      // Perform form submission logic here
    }
  };

  return (
    <Box>
      <Box>
        <PageBanner title="Order Product" />
      </Box>
      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item xs={10}>
            <Paper sx={{ p: 5, flexGrow: 1 }} elevation={2}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={4}
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Avatar
                    src={`${host}/uploads/customer/getImagesOfProduct/${singleProduct?.product?.picture}`}
                    variant="square"
                    sx={{ width: "100%", height: "50%", mt: 3 }}
                  />
                  <Typography
                    sx={{ textAlign: "center" }}
                    variant="body1"
                    color={"text.secondary"}
                  >
                    {singleProduct?.product?.title} from{" "}
                    {singleProduct?.product?.farmer?.name}
                  </Typography>
                  <Typography
                    sx={{ textAlign: "center" }}
                    variant="body2"
                    color={"text.secondary"}
                  >
                    ₹ {singleProduct?.product?.price}/
                    {singleProduct?.product?.unit}
                    {singleProduct?.product?.unitOfMeasure}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Box sx={{ px: 2, flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="caption"
                      color={"text.secondary"}
                    >
                      Basic Information
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 0 }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Enter your name"
                          placeholder="enter your name"
                          name="name"
                          onChange={handleChange}
                          value={formInfo?.name}
                          helperText={formError?.name && formError?.name}
                          error={!!formError.name}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Enter your contact number"
                          placeholder="enter your contact number"
                          name="phone"
                          onChange={handleChange}
                          value={formInfo?.phone}
                          helperText={formError?.phone && formError?.phone}
                          error={!!formError.phone}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Enter your email id"
                          placeholder="enter your email id"
                          name="email"
                          onChange={handleChange}
                          value={formInfo?.email}
                          helperText={formError?.email && formError?.email}
                          error={!!formError.email}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="number"
                          label={`Enter your quantity in ${singleProduct?.product?.unitOfMeasure}`}
                          placeholder="enter your quantity"
                          name="quantity"
                          onChange={handleChange}
                          value={formInfo?.quantity}
                          helperText={
                            formError?.quantity && formError?.quantity
                          }
                          error={!!formError.quantity}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ px: 2, flexGrow: 1 }}>
                    <Typography variant="caption" color={"text.secondary"}>
                      Shipping Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          label="Enter your complete address"
                          placeholder="enter complete address here"
                          name="address"
                          onChange={handleChange}
                          value={formInfo?.address}
                          helperText={formError?.address && formError?.address}
                          error={!!formError.address}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Enter your location"
                          placeholder="enter your location"
                          name="location"
                          onChange={handleChange}
                          value={formInfo?.location}
                          helperText={
                            formError?.location && formError?.location
                          }
                          error={!!formError.location}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Enter your city"
                          placeholder="enter your city"
                          name="city"
                          onChange={handleChange}
                          value={formInfo?.city}
                          helperText={formError?.city && formError?.city}
                          error={!!formError.city}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          label="Enter your pin"
                          placeholder="enter your pin"
                          name="pin"
                          onChange={handleChange}
                          value={formInfo?.pin}
                          helperText={formError?.pin && formError?.pin}
                          error={!!formError.pin}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ px: 2, flexGrow: 1 }}>
                    <Typography
                      variant="caption"
                      color={"text.secondary"}
                      gutterBottom
                    >
                      Payment Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} sx={{ mt: 1 }}>
                        <FormControl error={!!formError.paymentMethod}>
                          <FormLabel id="payment-method-label">
                            Payment Method
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="payment-method-label"
                            name="paymentMethod"
                            value={formInfo.paymentMethod}
                            onChange={handlePaymentChange}
                          >
                            <FormControlLabel
                              value="UPI"
                              control={<Radio />}
                              label="UPI"
                            />
                            <FormControlLabel
                              value="COD"
                              control={<Radio />}
                              label="COD"
                            />
                          </RadioGroup>
                          {formError.paymentMethod && (
                            <Typography
                              variant="caption"
                              color="error"
                              sx={{ mt: 1 }}
                            >
                              {formError.paymentMethod}
                            </Typography>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ px: 2, flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            p: 1,
                            mb: 1,
                            backgroundColor: "#404a3d",
                            "&:hover": {
                              backgroundColor: "#404a3d",
                            },
                          }}
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Typography
                          variant="h6"
                          color={"text.secondary"}
                          sx={{ float: "right", fontWeight: "600" }}
                        >
                          Total Amount : ₹{formInfo?.total}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
