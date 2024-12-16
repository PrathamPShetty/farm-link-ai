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
import { Box, Chip, Paper, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}
export default function RateOrder({ order }) {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const { updateOrder } = useContext(CustomerContext);
  const [open, setOpen] = React.useState(false);
  const [formInfo, setFormInfo] = React.useState({
    feedback: null,
    ratings: null,
  });
  const [formError, setFormError] = React.useState({
    feedback: null,
    ratings: null,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setFormInfo({ feedback: null, ratings: null });
    setFormError({ feedback: null, ratings: null });
    setValue(3);
    setOpen(false);
  };

  const handleSubmit = () => {
    if (formInfo.ratings == null) {
      setFormError({
        ...formError,
        ratings: "select any star to rate the order",
      });
    } else {
      const updatedInfo = {
        feedback: formInfo?.feedback,
        ratings: formInfo?.ratings,
      };
      updateOrder(order?._id, updatedInfo);
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <Chip
        label={"Rating"}
        // size="small"
        sx={{ p: 1, mt: 0 }}
        component={Paper}
        color="warning"
        onClick={handleClickOpen}
      ></Chip>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Rate your order experience</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rate your order and submit your feedback here
          </DialogContentText>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
              }}
            >
              <Rating
                size="large"
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  setFormInfo({ ...formInfo, ratings: newValue });
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
            {formError?.ratings && (
              <Typography color={"error"} variant="caption">
                {formError?.ratings}
              </Typography>
            )}
          </Box>
          <TextField
            autoFocus
            required
            margin="dense"
            name="feedback"
            label="Enter your feedback "
            fullWidth
            onChange={(e) => {
              setFormError({ ...formError, feedback: null });
              setFormInfo({ ...formInfo, feedback: e.target.value });
            }}
            value={formInfo?.feedback}
            helperText={formError?.feedback && formError.feedback}
            error={!!formError?.feedback}
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
