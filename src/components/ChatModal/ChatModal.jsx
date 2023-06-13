import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./ChatModal.css";
import laraLogo from "../../assets/images/lara-mascot.png";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

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

export default function ChatModal({ openchatmodal, closechatmodal, userChat }) {
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    //setOpen(false);
    closechatmodal();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        open={openchatmodal}
        maxWidth="md"
        fullWidth
      >
        <BootstrapDialogTitle onClose={handleClose}>
          LIHAT PERCAKAPAN
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="card chat-app">
            <div className="chat">
              <div className="chat-history">
                <ul className="m-b-0">
                  {userChat.map((chat, index) => {
                    return (
                      <li key={index}>
                        <div className="clearfix">
                          <div className="message user-message float-right">
                            {chat.pertanyaan}
                          </div>
                        </div>
                        <div className="clearfix">
                          <div className="message-data">
                            <img src={laraLogo} alt="avatar" />
                          </div>
                          <div className="position-relative">
                            <div className="message bot-message">
                              {chat.jawaban}
                            </div>
                            {chat.feedback === true ? (
                              <ThumbUpOffAltIcon className="align-middle" />
                            ) : chat.feedback === false ? (
                              <ThumbDownOffAltIcon className="align-middle" />
                            ) : null}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
