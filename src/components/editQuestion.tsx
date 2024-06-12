import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import { Answer, Question } from "../types";
import BasicSelect from "./selectTool";
import { server } from "../main";
import axios from "axios";

export interface IProps {
  q: Question;
  onEdit: (id: string) => void;
}

export function EditQuestion({ q, onEdit }: IProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>();
  const [multipleChoice, setMultipleChoice] = useState<boolean>();
  const [answers, setAnswers] = useState<Answer[]>();
  const [difficulty, setDifficulty] = useState<number>();
  //const [tags, setTags] = useState<string[]>();

  const reset = () => {
    setQuestion(q.question);
    setMultipleChoice(q.multipleChoice);
    setAnswers(q.answers);
    setDifficulty(q.difficulty);
    //setTags(q.tags);
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
      question: question,
      answers: answers,
      multipleChoice: multipleChoice,
      difficulty: difficulty,
      tags: q.tags,
    };
    const params = {
      id: q.id,
    };

    await axios
      .put(url, data, { params })
      .then(() => {
        alert("Question updated successfuly");
        onEdit(q.id);
      })
      .catch((error) => alert(error));
  };

  const onQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleMultipleChoice = () => {
    let correctIndex = answers?.findIndex((ans) => ans.correct === true);

    const onCorrectChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      correctIndex !== undefined &&
        answers !== undefined &&
        setAnswers(
          answers
            .slice(0, correctIndex)
            .concat({
              id: answers[correctIndex].id,
              answerText: e.target.value,
              correct: true,
            })
            .concat(answers.slice(correctIndex + 1))
        );
    };

    const onIncorrectChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      i: number
    ) => {
      answers !== undefined &&
        answers[i] !== undefined &&
        setAnswers(
          answers
            .slice(0, i)
            .concat({
              id: answers[i].id,
              answerText: e.target.value,
              correct: false,
            })
            .concat(answers.slice(i + 1))
        );
    };

    return (
      <div>
        <TextField
          required
          margin="normal"
          id="correct"
          label="Answer"
          type="text"
          value={
            answers !== undefined &&
            correctIndex !== undefined &&
            answers[correctIndex].answerText
          }
          onChange={(e) => onCorrectChange}
          fullWidth
          variant="outlined"
        />

        {answers !== undefined &&
          answers.map(
            (ans, i) =>
              ans.correct === false && (
                <TextField
                  required
                  margin="normal"
                  id={`incorrect ${i}`}
                  label="Incorrect answer"
                  type="text"
                  value={answers[i].answerText}
                  onChange={(e) => onIncorrectChange(e, i)}
                  fullWidth
                  variant="outlined"
                />
              )
          )}
      </div>
    );
  };

  const handleOpenQuestion = () => {
    let answer = answers?.find((ans) => ans.correct === true);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      answer !== undefined &&
        setAnswers([
          { id: answer.id, answerText: e.target.value, correct: true },
        ]);
    };

    return (
      <TextField
        required
        margin="normal"
        id="answer"
        label="Answer"
        type="text"
        value={answer?.answerText}
        onChange={onChange}
        fullWidth
        variant="outlined"
      />
    );
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
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="normal"
            id="question"
            label="Question"
            type="text"
            value={question}
            onChange={onQuestionChange}
            fullWidth
            variant="outlined"
          />
          {multipleChoice ? handleMultipleChoice() : handleOpenQuestion()}
          <div className="flex mt-[16px]">
            <div className="mr-[20px]">Difficaulty</div>
            <BasicSelect
              values={[1, 2, 3, 4, 5]}
              defaultValue={difficulty || 1}
              func={setDifficulty}
            ></BasicSelect>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Edit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
