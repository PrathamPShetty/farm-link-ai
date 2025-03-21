import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import upiQr from "../../Assets/upiQr.png";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#404a3d",
  color: "#fff",
}));

const CheckOutForm = ({ cart, host, checkOut }) => {
  const [formInfo, setFormInfo] = useState({
    name: "",
    phone: "",
    location: "",
    address: "",
    pinCode: "",
    locationLink: "",
    message: "",
  });

  const calculateTotal = (cartItems) => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item?.productId?.price * item?.quantity;
    });
    const grandTotal = subtotal; // Here, you can add tax or other fees if applicable
    return { subtotal, grandTotal };
  };

  const { subtotal, grandTotal } = calculateTotal(cart);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkOut(formInfo);
    // Add logic for order submission here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <Box py={5}>
              <Typography
                variant="h5"
                mb={4}
                sx={{ color: "#404a3d", fontWeight: "600" }}
              >
                Billing details
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" gap={2}>
                  <TextField
                    onChange={handleChange}
                    name="name"
                    fullWidth
                    label="Enter Name"
                    required
                  />
                  <TextField
                    onChange={handleChange}
                    name="phone"
                    fullWidth
                    label="Enter Contact number"
                    required
                  />
                </Box>
                <TextField
                  onChange={handleChange}
                  name="location"
                  fullWidth
                  label="Location"
                  placeholder="Your location, area, city"
                  required
                />
                <TextField
                  onChange={handleChange}
                  name="address"
                  fullWidth
                  multiline
                  rows={2}
                  label="Complete Address"
                  placeholder="House Number, Street Name"
                  required
                />
                <TextField
                  onChange={handleChange}
                  name="pinCode"
                  fullWidth
                  label="Postcode/Zip"
                  required
                />
                <TextField
                  onChange={handleChange}
                  name="locationLink"
                  fullWidth
                  label="Location link"
                  required
                />
                <TextField
                  onChange={handleChange}
                  name="message"
                  fullWidth
                  label="Order Notes (Optional)"
                  rows={4}
                  multiline
                  placeholder="Type your message here"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box py={5}>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Product</StyledTableCell>
                      <StyledTableCell>Title</StyledTableCell>
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell>Quantity</StyledTableCell>
                      <StyledTableCell>Total</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <img
                              src={`${host}/uploads/customer/getImagesFromAdmin/${item?.productId?.picture}`}
                              alt={item?.productId?.title}
                              style={{
                                width: "90px",
                                height: "90px",
                                borderRadius: "10px",
                                marginRight: "20px",
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>{item?.productId?.title}</TableCell>
                        <TableCell>₹{item?.productId?.price}</TableCell>
                        <TableCell>{item?.quantity}</TableCell>
                        <TableCell>
                          ₹{item?.productId?.price * item?.quantity}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3}></TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "600", color: "#404a3d" }}
                        >
                          TOTAL
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "600", color: "#404a3d" }}
                        >
                          ₹{grandTotal.toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <img src={upiQr} alt="" style={{ width: "200px" }} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5}>
                        <TextField
                          onChange={handleChange}
                          name="transactionId"
                          fullWidth
                          title="type the transaction which you got after paying through upi"
                          required
                          label="Enter transaction ID"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Button
                          sx={{ p: 1, backgroundColor: "#404a3d" }}
                          variant="contained"
                          color="primary"
                          fullWidth
                          type="submit"
                        >
                          Place Order
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CheckOutForm;
