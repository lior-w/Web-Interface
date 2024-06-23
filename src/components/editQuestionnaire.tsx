import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { Question, Questionnaire, QuestionnaireQuestion } from "../types";
import { server } from "../main";
import axios from "axios";
import { EditQuestion } from "./editQuestion";

export interface IProps {
  q: Questionnaire;
  onEdit: (id: string) => void;
}

export function EditQuestionnaire({ q, onEdit }: IProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [questions, setQuestions] = useState<QuestionnaireQuestion[]>();

  const reset = () => {
    setName(q.name);
    setQuestions(q.questions);
  };

  const handleClickOpen = () => {
    reset();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const url = `${server}/question/update_question`;
    const data = {
      id: q.id,
      name: name,
      questions: questions,
    };
    const params = {
      id: q.id,
    };

    const onQuestionChange = (id: string) => {};

    const handleEditQuestion = async (question: Question) => {
      <EditQuestion q={question} onEdit={(qid: string) => {}}></EditQuestion>;
    };

    await axios
      .put(url, data, { params })
      .then(() => {
        alert("Questionnaire updated successfuly");
        onEdit(q.id);
      })
      .catch((error) => alert(error));
  };

  return (
    <React.Fragment>
      <Button variant="text" onClick={handleClickOpen}>
        <EditIcon />
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
        <DialogTitle>Edit Questionnaire</DialogTitle>
        <DialogContent>
          <div className="flex mt-[16px]"></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Edit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
