import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { FarmerContext } from "../../Context/Context";

export default function AcceptOrder({ order, handleCloseMainModal }) {
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
      <Button color="success" onClick={handleClickOpen}>
        Accept
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Attempting to accept the order!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ textAlign: "center" }}
            id="alert-dialog-description"
          >
            Are you sure, want to accept the order of {order?.product?.title} of{" "}
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
              updateOrder(order?._id, { orderStatus: "Confirmed" });
              handleClose();
              handleCloseMainModal(false);
            }}
            autoFocus
            color="success"
          >
            Yes, Accept Order
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
