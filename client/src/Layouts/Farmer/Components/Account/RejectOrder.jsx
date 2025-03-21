import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { FarmerContext } from "../../Context/Context";

export default function RejectOrder({ order, handleCloseMainModal }) {
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
      <Button color="error" onClick={handleClickOpen}>
        Reject
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Attempting to reject the order!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textAlign: "center" }}
            id="alert-dialog-description"
          >
            Are you sure, want to reject order of {order?.product?.title} of{" "}
            {order?.quantity} {order?.product?.unitOfMeasure} from {order?.name}{" "}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              //   cancelOrder(order?._id);
              updateOrder(order?._id, { orderStatus: "Rejected" });
              handleClose();
              handleCloseMainModal(false);
            }}
            autoFocus
          >
            Yes, Reject Order
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
