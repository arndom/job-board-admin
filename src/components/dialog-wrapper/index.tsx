import React, { MouseEvent, PointerEvent } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { SaveButton } from "@refinedev/mui";

interface Props {
  visible: boolean;
  close: () => void;
  title: string;
  children: React.ReactNode;
  onSave?: (
    e:
      | (PointerEvent<HTMLButtonElement> & MouseEvent<HTMLButtonElement>)
      | React.BaseSyntheticEvent
  ) => Promise<void> | void | undefined;
  saveButtonProps?: {
    disabled?: boolean;
    onClick?: (e: React.BaseSyntheticEvent) => void;
  };
  mode: "add" | "edit";
}

export const DialogWrapper: React.FC<Props> = ({
  visible,
  close,
  title,
  children,
  onSave,
  saveButtonProps,
  mode
}) => {
  return (
    <Dialog
      open={visible}
      onClose={close}
      PaperProps={{
        sx: {
          maxWidth: 800,
          maxHeight: { xs: "70svh", sm: "80svh", md: "90svh" },
          width: { xs: "90%", sm: "75%", md: "50%" },
          height: "fit-content",
          margin: "auto"
        }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <SaveButton {...saveButtonProps} onClick={onSave}>
          {mode === "edit" ? "Update" : "Save"}
        </SaveButton>
      </DialogActions>
    </Dialog>
  );
};
