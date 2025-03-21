import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Chip,
  Rating,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import moment from "moment";
import { Link } from "react-router-dom";
import Feedback from "./Feedback";
import noOrder from "../../Assets/noOrder.avif";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CancelOrder from "./CancelOrder";
import MakePayment from "./MakePayment";
import Modal from "@mui/material/Modal";
import TrackOrder from "./TrackOrder";
import RateOrder from "./RateOrder";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "50%",
};
const OrderHistory = ({ orders, host, feedback }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const handleOpen = (selected) => {
    setOpen(true);
    setSelectedOrder(selected);
  };

  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {orders?.length > 0 && (
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "600", color: "#404a3d", textAlign: "center" }}
          gutterBottom
        >
          Order History
        </Typography>
      )}
      {orders?.length > 0 ? (
        orders?.map((order, i) => (
          <Paper key={i} elevation={3} sx={{ mb: 4, p: 1 }}>
            {order?.status == "Delivered" && (
              <Feedback feedback={feedback} order={order} />
            )}
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>Placed On</TableCell>
                    <TableCell>
                      {moment(order.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>₹{order.total}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>
                      <Typography
                        component={Link}
                        to={`/SingleProduct/${order?.product?._id}`}
                        sx={{ textDecoration: "none" }}
                      >
                        {order.product?.title}
                      </Typography>
                    </TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>
                      {order?.product?.price} / {order?.product?.unit}{" "}
                      {order?.product?.unitOfMeasure}
                    </TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>
                      {order?.product?.unit} {order?.product?.unitOfMeasure} X{" "}
                      {order?.quantity}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Location/Pin code</TableCell>
                    <TableCell colSpan={3}>
                      {order.location} / {order.pin}
                    </TableCell>
                    <TableCell colSpan={2} rowSpan={2}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={`${host}/uploads/customer/getImagesOfProduct/${order?.product?.picture}`}
                          alt={order?.product?.title}
                          sx={{ width: "300px", p: 1 }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell colSpan={3}>{order?.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Order Status</TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                    <TableCell>Payment Status</TableCell>
                    <TableCell>{order.paymentStatus}</TableCell>
                    <TableCell>
                      {order?.transactionId &&
                        order?.paymentMethod == "UPI" &&
                        "Transaction ID"}
                    </TableCell>
                    <TableCell>
                      {order?.transactionId &&
                        order?.paymentMethod == "UPI" &&
                        order?.transactionId}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  {order?.ratings && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 1,
                        pl: 2,
                      }}
                    >
                      <Typography color={"text.secondary"}>Ratings</Typography>
                      <Rating
                        size="small"
                        name="read-only"
                        value={parseFloat(order?.ratings)}
                        readOnly
                      />
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "50%",
                  }}
                >
                  {order?.orderStatus == "Placed" && (
                    <CancelOrder order={order} />
                  )}
                  {order?.orderStatus == "Accepted" &&
                    order?.paymentMethod == "UPI" && (
                      <>
                        <CancelOrder order={order} />
                        <MakePayment host={host} order={order} />
                      </>
                    )}

                  {(order?.orderStatus == "Confirmed" ||
                    order?.orderStatus == "Prepared" ||
                    order?.orderStatus == "Dispatched" ||
                    order?.orderStatus == "Out for Delivery" ||
                    order?.orderStatus == "Delivered") && (
                    <Button onClick={() => handleOpen(order)} color="info">
                      Track Order
                    </Button>
                  )}
                  {order?.orderStatus == "Delivered" && !order?.ratings && (
                    <RateOrder order={order} />
                  )}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <TrackOrder status={selectedOrder?.orderStatus} />
                    </Box>
                  </Modal>
                </Box>
              </Box>
            </TableContainer>
            <Divider />
          </Paper>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={noOrder} style={{ width: "300px" }} alt="" />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontWeight: "600" }}
          >
            No order history found!
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default OrderHistory;
