import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const larahost = process.env.REACT_APP_HOST;

export default function FormModal({
  openformmodal,
  closeformmodal,
  updatedataset,
  baru,
  data,
}) {
  // const [open, setOpen] = useState(false);
  const [dataset, setDataset] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    // setOpen(false);
    closeformmodal();
    setLoading(false);
  };

  //setDataset(data);

  const handleOnChangeDataset = (e) => {
    setDataset({
      ...dataset,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (baru === true) {
      try {
        const response = await axios.post(larahost + "/dataset", dataset, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        handleClose();
        setLoading(false);
        updatedataset(response.data.data);
        setError(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    } else if (baru === false) {
      try {
        const response = await axios.put(
          larahost + "/dataset/" + dataset.id_data,
          dataset,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        handleClose();
        setLoading(false);
        updatedataset(response.data.data);
        setError(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    }
  };

  return (
    <div>
      <BootstrapDialog onClose={handleClose} open={openformmodal} fullWidth>
        <BootstrapDialogTitle onClose={handleClose}>
          {baru ? "BARU" : "EDIT"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {error && (
            <Alert variant="outlined" severity="error">
              Terjadi error — Silahkan coba lagi!
            </Alert>
          )}

          <form onSubmit={handleSubmit} id="formSumbit">
            <FormControl fullWidth variant="standard">
              {/* <Typography align="center" variant="h6" component="h6">
                Silahkan isi formulir di bawah ini untuk menggunakan layanan
                konsultasi dengan chatbot.
              </Typography> */}
              <TextField
                color="secondary"
                margin="normal"
                fullWidth
                label="Title"
                name="title"
                required
                value={dataset.title}
                onChange={handleOnChangeDataset}
              />
              <TextField
                color="secondary"
                margin="normal"
                fullWidth
                label="Heading"
                name="heading"
                required
                value={dataset.heading}
                onChange={handleOnChangeDataset}
              />
              <TextField
                color="secondary"
                margin="normal"
                label="Content"
                name="content"
                multiline
                required
                value={dataset.content}
                onChange={handleOnChangeDataset}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            form="formSumbit"
            type="submit"
            autoFocus
            color="secondary"
            disabled={
              loading | (JSON.stringify(data) === JSON.stringify(dataset))
            }
          >
            {loading && (
              <CircularProgress color="secondary" size={20} disableShrink />
            )}
            {!loading && "Simpan"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
