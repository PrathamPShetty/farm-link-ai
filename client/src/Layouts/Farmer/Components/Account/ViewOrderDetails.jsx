import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  Box,
  CardMedia,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import UploadQr from "./UploadQr";
import RejectOrder from "./RejectOrder";
import AcceptOrder from "./AcceptOrder";
import ManageUPIPayment from "./ManageUPIPayment";
import TrackOrder from "./TrackOrder";
import { FarmerContext } from "../../Context/Context";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    backgroundColor: "red",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ViewOrderDetails({ order, host }) {
  const { updateOrder } = React.useContext(FarmerContext);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} size="small">
        View more
      </Button>
      <Dialog
        fullWidth
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Order Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>Placed On</TableCell>
                  <TableCell>
                    {moment(order?.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>₹{order?.total}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>{order?.name}</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>{order?.email}</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>{order?.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>{order?.product?.title}</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>
                    {order?.product?.price} / {order?.product?.unit}{" "}
                    {order?.product?.unitOfMeasure}
                  </TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>
                    {order?.quantity} {order?.product?.unitOfMeasure}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Location/Pin code</TableCell>
                  <TableCell colSpan={3}>
                    {order?.location} / {order?.pin}
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
                        image={`${host}/uploads/farmer/product/${order?.product?.picture}`}
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
                  <TableCell>{order?.orderStatus}</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell>{order?.paymentStatus}</TableCell>
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
                {order?.ratings && (
                  <TableRow>
                    {order?.feedback && (
                      <>
                        <TableCell>Feedback</TableCell>
                        <TableCell>{order?.feedback}</TableCell>
                      </>
                    )}
                    <TableCell>Ratings</TableCell>
                    <TableCell>
                      <Rating
                        name="read-only"
                        value={parseFloat(order?.ratings)}
                        readOnly
                      />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    {!order?.feedback && (
                      <>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        {(order?.orderStatus == "Confirmed" ||
          order?.orderStatus == "Prepared" ||
          order?.orderStatus == "Dispatched" ||
          order?.orderStatus == "Out for Delivery" ||
          order?.orderStatus == "Delivered") && (
          <TrackOrder status={order?.orderStatus} />
        )}
        <DialogActions>
          {order?.orderStatus == "Cancelled" && (
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                fontWeight: "600",
              }}
              variant="h6"
              color={"text.secondary"}
            >
              Order {order?.orderStatus}
            </Typography>
          )}
          {order?.orderStatus == "Rejected" && (
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                fontWeight: "600",
              }}
              variant="h6"
              color={"text.secondary"}
            >
              Order {order?.orderStatus}
            </Typography>
          )}
          {order?.orderStatus == "Placed" && (
            <>
              <RejectOrder order={order} handleCloseMainModal={setOpen} />
              {order?.paymentMethod == "UPI" ? (
                <UploadQr order={order} handleCloseMainModal={setOpen} />
              ) : (
                <AcceptOrder order={order} handleCloseMainModal={setOpen} />
              )}
            </>
          )}
          {order?.orderStatus == "Accepted" &&
            order?.paymentStatus == "Pending" && (
              <>
                <RejectOrder order={order} handleCloseMainModal={setOpen} />
              </>
            )}
          {order?.paymentStatus == "Initiated" && order?.transactionId && (
            <>
              <ManageUPIPayment
                order={order}
                handleCloseMainModal={setOpen}
                status="Verified"
              />
              <ManageUPIPayment
                order={order}
                handleCloseMainModal={setOpen}
                status="Denied"
              />
            </>
          )}
          {order?.paymentStatus == "Denied" && order?.transactionId && (
            <>
              <ManageUPIPayment
                order={order}
                handleCloseMainModal={setOpen}
                status="Verified"
              />
            </>
          )}
          {order?.orderStatus == "Confirmed" ? (
            <Button
              onClick={() => {
                //   cancelOrder(order?._id);
                updateOrder(order?._id, { orderStatus: "Prepared" });
                handleClose();
              }}
              color="warning"
            >
              Order Prepared
            </Button>
          ) : order?.orderStatus == "Prepared" ? (
            <Button
              onClick={() => {
                //   cancelOrder(order?._id);
                updateOrder(order?._id, { orderStatus: "Dispatched" });
                handleClose();
              }}
              color="warning"
            >
              Order Dispatched
            </Button>
          ) : order?.orderStatus == "Dispatched" ? (
            <Button
              onClick={() => {
                //   cancelOrder(order?._id);
                updateOrder(order?._id, { orderStatus: "Out for Delivery" });
                handleClose();
              }}
              color="warning"
            >
              Order Out for Delivery
            </Button>
          ) : order?.orderStatus == "Out for Delivery" ? (
            <Button
              onClick={() => {
                //   cancelOrder(order?._id);
                updateOrder(order?._id, { orderStatus: "Delivered" });
                handleClose();
              }}
              color="success"
            >
              Order Delivered
            </Button>
          ) : (
            ""
          )}
          {order?.orderStatus == "Delivered" &&
            order?.paymentMethod == "COD" &&
            order?.paymentStatus != "Paid" && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography variant="caption" color={"warning"}>
                  Customer opted Cash on delivery option for payment, So make
                  sure you received the amount ₹{order?.total}!
                </Typography>
                <Button
                  onClick={() => {
                    //   cancelOrder(order?._id);
                    updateOrder(order?._id, { paymentStatus: "Paid" });
                    handleClose();
                  }}
                  color="success"
                >
                  Amount Received
                </Button>
              </Box>
            )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
