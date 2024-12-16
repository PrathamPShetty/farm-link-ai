import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { CustomerContext } from "../../Context/Context";
import { Box } from "@mui/material";

export default function MakePayment({ host, order }) {
  const { updateOrder } = useContext(CustomerContext);
  const [open, setOpen] = React.useState(false);
  const [formInfo, setFormInfo] = React.useState({ transactionId: null });
  const [formError, setFormError] = React.useState({ transactionId: null });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setFormInfo({ transactionId: null });
    setFormError({ transactionId: null });
    setOpen(false);
  };

  const handleSubmit = () => {
    if (formInfo.transactionId == null) {
      setFormError({ transactionId: "Enter transaction ID!" });
    } else {
      const updatedInfo = {
        transactionId: formInfo?.transactionId,
        paymentStatus: "Initiated",
      };
      updateOrder(order?._id, updatedInfo);
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <Button size="small" color="warning" onClick={handleClickOpen}>
        Pay
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Make Payment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Scan QR code to make payment and enter transaction ID
          </DialogContentText>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "400px" }}
              src={`${host}/uploads/customer/getImagesFromFarmer/${order?.qrCode}`}
              alt=""
            />
          </Box>
          <TextField
            autoFocus
            required
            margin="dense"
            name="transactionId"
            label="Enter transaction id "
            fullWidth
            onChange={(e) => {
              setFormError({ transactionId: null });
              setFormInfo({ transactionId: e.target.value });
            }}
            value={formInfo?.transactionId}
            helperText={formError?.transactionId && formError.transactionId}
            error={!!formError?.transactionId}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
