import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SlideDialog(props) {
  const { title, content, showWarning, onConfirm } = props;
  const [state, setState] = React.useState({
    open: showWarning,
  });

  const handleConfirm = () => {
    onConfirm(true);
    setState({ open: false });
  };

  const handleDeny = () => {
    onConfirm(false);
    setState({ open: false });
  };

  useEffect(() => {
    setState((state) => ({
      ...state,
      open: props.showWarning,
    }));
  }, [props.showWarning]);

  return (
    <div>
      <Dialog
        open={state.open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleConfirm}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleDeny}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
