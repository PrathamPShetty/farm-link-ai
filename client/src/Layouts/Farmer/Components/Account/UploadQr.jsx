import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { FarmerContext } from "../../Context/Context";

export default function UploadQr({ handleCloseMainModal, order }) {
  const { updateOrder } = useContext(FarmerContext);
  const [open, setOpen] = React.useState(false);
  const [formInfo, setFormInfo] = React.useState({ qrCode: null });
  const [formError, setFormError] = React.useState({ qrCode: null });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormInfo({ qrCode: null });
    setFormError({ qrCode: null });
    setOpen(false);
  };
  const handleSubmit = () => {
    if (formInfo.qrCode == null) {
      setFormError({ qrCode: "Upload QR code picture!" });
    } else {
      const Data = new FormData();
      Data.append("qrCode", formInfo.qrCode);
      Data.append("orderStatus", "Accepted");
      updateOrder(order?._id, Data);
      handleClose();
      handleCloseMainModal(false);
    }
  };

  return (
    <React.Fragment>
      <Button color="primary" autoFocus onClick={handleClickOpen}>
        Accept
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Accept the order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upload QR Code to receive the payment
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            onChange={(e) =>
              setFormInfo({ ...formInfo, [e.target.name]: e.target.files[0] })
            }
            name="qrCode"
            label="Upload QR Code picture"
            type="file"
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="standard"
            helperText={formError?.qrCode && formError?.qrCode}
            error={!!formError?.qrCode}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Accept</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
