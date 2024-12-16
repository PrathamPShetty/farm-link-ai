import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { FarmerContext } from "../../Context/Context";

export default function ManageUPIPayment({
  order,
  handleCloseMainModal,
  status,
}) {
  const { updateOrder } = useContext(FarmerContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {status == "Verified" ? (
        <Button color="success" onClick={handleClickOpen}>
          Verify
        </Button>
      ) : (
        <Button color="error" onClick={handleClickOpen}>
          Deny
        </Button>
      )}
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Attempting to {status == "Verified" ? "verify" : "deny"} the payment!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textAlign: "center" }}
            id="alert-dialog-description"
          >
            Are you sure, want to {status == "Verified" ? "verify" : "deny"} the
            payment from {order?.name} of Rs.{order?.total} with transaction id
            - {order?.transactionId}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          {status == "Verified" ? (
            <Button
              onClick={() => {
                //   cancelOrder(order?._id);
                updateOrder(order?._id, {
                  paymentStatus: "Paid",
                  orderStatus: "Confirmed",
                });
                handleClose();
                // handleCloseMainModal(false);
              }}
              autoFocus
              color="success"
            >
              Yes, Verify Payment
            </Button>
          ) : (
            <Button
              onClick={() => {
                //   cancelOrder(order?._id);
                updateOrder(order?._id, { paymentStatus: "Denied" });
                handleClose();
                handleCloseMainModal(false);
              }}
              autoFocus
              color="success"
            >
              Yes, Deny Payment
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
