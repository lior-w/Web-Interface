import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Question, Token } from "../types";
import { server } from "../main";
import axios from "axios";

export interface IProps {
  token: Token;
  q: Question;
  onDelete: (id: string) => void;
}

export function DeleteQuestion({ token, q, onDelete }: IProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const url = `${server}/question/delete_question`;
    const data = {
      id: q.id,
    };
    const headers = { AUTHORIZATION: token.AUTHORIZATION };

    await axios
      .delete(url, { data: data, headers: headers })
      .then(() => {
        alert("Question deleted successfuly");
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
        <DialogTitle>{`Are you sure you want to delete the following question?`}</DialogTitle>
        <DialogContent>
          <div className="italic">{q.question}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
