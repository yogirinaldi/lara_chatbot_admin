import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmModal({ handleDelete, buttonDisabled }) {
  const [open, setOpen] = useState(false);
  //const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="small"
        variant="outlined"
        color="error"
        sx={{ margin: "5px" }}
        onClick={handleClickOpen}
        disabled={buttonDisabled}
      >
        Hapus
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Yakin ingin menghapus data?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Data yang telah dihapus tidak dapat dipulihkan kembali.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" autoFocus onClick={handleClose}>
            Tidak
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              handleDelete();
              handleClose();
            }}
            autoFocus
          >
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
