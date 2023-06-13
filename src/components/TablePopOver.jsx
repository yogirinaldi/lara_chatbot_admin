import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const TablePopOver = ({ open, onClose, popoverContent }) => {
  const handleClose = () => {
    onClose && onClose();
  };

  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        PaperProps={{
          style: { maxWidth: "500px" },
        }}
        transitionDuration={0}
        marginThreshold={0}
      >
        <Typography sx={{ p: 2 }}>{popoverContent}</Typography>
      </Popover>
    </div>
  );
};

export default TablePopOver;
