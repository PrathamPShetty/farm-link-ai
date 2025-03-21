import React from "react";
import {
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { Add, Remove, Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import noCart from "../../Assets/noCart.webp";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#404a3d",
  color: "white",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "uppercase",
  // margin: theme.spacing(1),
}));

const CartData = ({ cart, host, updateCart, deleteFromCart }) => {
  // Calculate the subtotal and grand total
  const calculateTotal = (cartItems) => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item?.productId?.price * item?.quantity;
    });
    const grandTotal = subtotal; // Here, you can add tax or other fees if applicable
    return { subtotal, grandTotal };
  };

  const { subtotal, grandTotal } = calculateTotal(cart);

  const handleUpdateQuantity = (id, quantity, condition) => {
    if (condition === "Plus") {
      updateCart(id, +quantity + +1);
      // updateCart(id, quantity + 1);
    } else {
      updateCart(id, +quantity - +1);
      // updateCart(id, quantity - 1);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {cart?.length > 0 ? (
        <Box py={5}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Product</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Quantity</StyledTableCell>
                  <StyledTableCell>Total</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <img
                          src={`${host}/uploads/customer/getImagesFromAdmin/${item?.productId?.picture}`}
                          alt={item?.productId?.title}
                          style={{
                            width: "80px",
                            height: "100px",
                            borderRadius: "10px",
                            marginRight: "20px",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography>{item?.productId?.title}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>₹{item?.productId?.price}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        {item?.quantity > 1 && (
                          <IconButton
                            onClick={() =>
                              handleUpdateQuantity(
                                item?._id,
                                item?.quantity,
                                "k"
                              )
                            }
                          >
                            <Remove />
                          </IconButton>
                        )}
                        <TextField
                          sx={{
                            textAlign: "center",
                            width: "40px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            mx: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          readOnly
                          value={item?.quantity}
                        />
                        <IconButton
                          onClick={() =>
                            handleUpdateQuantity(
                              item?._id,
                              item?.quantity,
                              "Plus"
                            )
                          }
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        ₹{item?.productId?.price * item?.quantity}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => deleteFromCart(item?._id)}>
                        <Close color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={noCart} alt="" style={{ width: "300px", opacity: "80%" }} />
          <Typography
            variant="body1"
            sx={{ fontWeight: "900", color: "#404a3d" }}
          >
            Your cart is empty!
          </Typography>
        </Box>
      )}
      {cart?.length > 0 && (
        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Box width="100%" maxWidth="400px">
            <Paper elevation={0} sx={{ backgroundColor: "#6d7b6861" }}>
              <Box sx={{ p: 2 }}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ fontWeight: "900", color: "#404a3d" }}
                >
                  Cart <span style={{ fontWeight: "600" }}>Total</span>
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" sx={{ px: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "600", color: "#404a3d" }}
                >
                  Subtotal:
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "600", color: "#404a3d" }}
                >
                  ₹{subtotal.toFixed(2)}
                </Typography>
              </Box>
              <Divider
                sx={{ borderColor: "#404a3d", borderWidth: "1px", mt: 2 }}
              />
              <Box
                display="flex"
                justifyContent="space-between"
                sx={{ px: 2, py: 1 }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "600", color: "#404a3d" }}
                >
                  Total:
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "600", color: "#404a3d" }}
                >
                  ₹{grandTotal.toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ borderColor: "#404a3d", borderWidth: "1px" }} />
              <Box sx={{ p: 1 }}>
                <StyledButton
                  component={Link}
                  to="/CheckOut"
                  variant=""
                  color="primary"
                  sx={{ width: "100%", fontWeight: "900", color: "#404a3d" }}
                >
                  Proceed to Checkout
                </StyledButton>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default CartData;
