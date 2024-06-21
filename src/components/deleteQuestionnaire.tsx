import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Question, Questionnaire } from "../types";
import BasicSelect from "./selectTool";
import { server } from "../main";
import axios from "axios";

export interface IProps {
  q: Questionnaire;
  onDelete: (id: string) => void;
}

export function DeleteQuestion({ q, onDelete }: IProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const url = `${server}/question/delete_questionnaire`;
    const params = {
      id: q.id,
    };

    await axios
      .delete(url, { params })
      .then(() => {
        alert("Questionnaire deleted successfuly");
        onDelete(q.id);
      })
      .catch((error) => alert(error));
  };

  return (
    <React.Fragment>
      <Button variant="text" onClick={handleClickOpen}>
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            handleSubmit();
            handleClose();
          },
        }}
      >
        <div className="w-[500px]"></div>
        <DialogTitle>{`Are you sure you want to delete the following questionnaire?`}</DialogTitle>
        <DialogContent>
          <div className="italic">{q.name}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
