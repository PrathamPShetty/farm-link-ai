import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip } from "@mui/material";

export default function Feedback({ feedback, order }) {
  const [open, setOpen] = React.useState(false);
  const [formInfo, setFormInfo] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submitFeedback = (e) => {
    e.preventDefault();
    feedback(order?._id, formInfo);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Chip
        onClick={handleClickOpen}
        component={Button}
        variant="outlined"
        label="Feedback"
        color="warning"
        sx={{ float: "right", cursor: "pointer" }}
        elevation={1}
      />
      <Dialog
        component={"form"}
        onSubmit={submitFeedback}
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle>Submit your feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            submit your valuable feedback for your order!
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="feedback"
            label="Feedback"
            placeholder="type your feedback here"
            multiline
            onChange={(e) => setFormInfo(e.target.value)}
            rows={2}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
