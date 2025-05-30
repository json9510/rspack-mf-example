import { forwardRef, useImperativeHandle, useState } from "react";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Box,
  type Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import type { JSX } from "react";

export type ImperativeHandle = {
  changeModal: () => void;
};

export interface CustomModalProps {
  dialogContent: JSX.Element;
  dialogActions?: JSX.Element;
  onClose?: () => void;
  maxWidth?: Breakpoint;
  id?: string;
}

const CustomModal = forwardRef<ImperativeHandle, CustomModalProps>(
  (props, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      changeModal() {
        setOpen(!open);
      },
    }));

    return (
      <Dialog
        PaperProps={{
          style: { borderRadius: "14px", width: "100%" },
        }}
        fullWidth
        maxWidth={props?.maxWidth || "xs"}
        open={open}
        id={props.id ?? "modal"}
      >
        <Box sx={{ padding: "0px 20px 20px 20px" }}>
          <DialogTitle sx={{ paddingBottom: "0px" }}>
            <IconButton
              sx={{ float: "right" }}
              onClick={() => {
                setOpen(false);
                props.onClose !== undefined ? props.onClose() : "";
              }}
            >
              <HighlightOffIcon sx={{ fontSize: "35px", color: "#8876af" }} />
            </IconButton>
          </DialogTitle>
          <DialogContent
            id="modal-dialog-content"
            sx={{ width: "100%", paddingBottom: "0px" }}
          >
            {props.dialogContent}
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {props.dialogActions}
          </DialogActions>
        </Box>
      </Dialog>
    );
  }
);

export default CustomModal;
