import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { FarmerContext } from "../../../Context/Context";

export default function NewPost({ productId }) {
  const { uploadProductPortFolio } = useContext(FarmerContext);
  const [open, setOpen] = React.useState(false);
  const [formInfo, setFormInfo] = React.useState({
    picture: null,
    subTitle: "",
  });
  const [formError, setFormError] = React.useState({
    picture: "",
    subTitle: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormInfo({ picture: null, subTitle: "" });
    setFormError({ picture: "", subTitle: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { picture: "", subTitle: "" };

    if (!formInfo.picture) {
      errors.picture = "Picture is required.";
      isValid = false;
    }
    if (!formInfo.subTitle.trim()) {
      errors.subTitle = "Subtitle is required.";
      isValid = false;
    } else if (formInfo.subTitle.length < 5) {
      errors.subTitle = "Subtitle must be at least 5 characters.";
      isValid = false;
    }

    setFormError(errors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const Data = new FormData();
      Data.append("picture", formInfo.picture);
      Data.append("subTitle", formInfo.subTitle);
      Data.append("product", productId);
      uploadProductPortFolio(productId, Data);
      handleClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInfo((prev) => ({
      ...prev,
      [name]: name === "picture" ? e.target.files[0] : value,
    }));
    setFormError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <React.Fragment>
      <Button variant="text" size="small" onClick={handleClickOpen}>
        New Post
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Upload Post</DialogTitle>
        <DialogContent>
          <DialogContentText>Post portfolio using the form</DialogContentText>
          <TextField
            required
            margin="dense"
            name="picture"
            label="Upload Picture"
            type="file"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
            error={!!formError.picture}
            helperText={formError.picture}
          />
          <TextField
            required
            margin="dense"
            name="subTitle"
            label="Post Subtitle"
            fullWidth
            variant="standard"
            value={formInfo.subTitle}
            onChange={handleInputChange}
            error={!!formError.subTitle}
            helperText={formError.subTitle}
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
