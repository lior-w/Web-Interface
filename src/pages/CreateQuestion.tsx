import React, { ChangeEvent, useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import NumbersRating from "../components/starRating";
import { Token, Question, Pages } from "../types";
import { server } from "../main";
import Navigation from "../components/navigation";
import AddIcon from "@mui/icons-material/Add";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import {
  Box,
  Fab,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import { GiSleepingBag } from "react-icons/gi";

export interface IProps {
  token: Token;
  toMain: () => void;
  username: string | undefined;
  onSubmit: (question: Question) => void;
  pages: Pages;
}

export const CreateQuestion = ({
  token,
  toMain,
  username,
  onSubmit,
  pages,
}: IProps) => {
  const [question, setQuestion] = useState<string>("");
  const [multipleChoice, setMultipleChoice] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [incorrectAnswersNum, setIncorrectAnswersNum] = useState<number>(1);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [deletables, setDeletabels] = useState<boolean[]>([]);
  const [difficulty, setDifficulty] = useState<number | null>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  /*
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    multipleChoice && incorrectAnswers.every((answer) => answer.length === 0)
      ? setErrorMessage(
          "Multiple-choice question has to contain at least 1 incorrect answer"
        )
      : setErrorMessage("");
    const q: Question = {
      id: "",
      multipleChoice: multipleChoice,
      question: question,
      answer: correctAnswer,
      incorrectAnswers: incorrectAnswers,
      difficulty: difficulty === null ? 0 : difficulty,
      tags: tags,
    };
    onSubmit(q);
  };
*/

  const addTag = (tag: string) => {
    setTags(tags.concat(tag));
    setDeletabels(deletables.concat(false));
  };

  const handleAddTag = () => {
    currentTag.length > 0 ? addTag(currentTag) : setTags(tags);
    setCurrentTag("");
  };

  const handleDeleteTag = (index: number) => {
    setTags(tags.slice(0, index).concat(tags.slice(index + 1)));
    setDeletabels(
      deletables.slice(0, index).concat(deletables.slice(index + 1))
    );
  };

  const onTagClick = (index: number) => {
    setDeletabels(
      deletables
        .slice(0, index)
        .concat(!deletables[index])
        .concat(deletables.slice(index + 1))
    );
  };

  const onQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const onCorrectAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectAnswer(e.target.value);
  };

  const onIncorrectAnswerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    setErrorMessage("");
    setIncorrectAnswers(
      incorrectAnswers
        .slice(0, index)
        .concat(e.target.value)
        .concat(incorrectAnswers.slice(index + 1))
    );
  };

  const onCurrentTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  const onOpenClick = () => {
    setMultipleChoice(false);
  };

  const onMultiClick = () => {
    setMultipleChoice(true);
  };

  const twoOptions = () => {
    return (
      <div>
        <button
          className={`border-2 border-brown rounded-s-lg w-[70px] text-lg  ${
            multipleChoice
              ? "text-brown hover:bg-orange-300"
              : "bg-brown text-orange-100"
          }`}
          type="button"
          onClick={onOpenClick}
        >
          OPEN
        </button>
        <button
          className={`border-2 border-brown rounded-e-lg w-[70px] text-lg ${
            !multipleChoice
              ? "text-brown hover:bg-orange-300"
              : "bg-brown text-orange-100 "
          }`}
          type="button"
          onClick={onMultiClick}
        >
          MULTI
        </button>
      </div>
    );
  };

  const openQuestion = () => {
    return (
      <div>
        <div className="text-lg text-brown font-bold">Answer</div>
        <input
          className="p-2.5 w-[100%] h-12 border-2 border-gray-300 rounded-md"
          type="text"
          placeholder="Enter The Answer"
          value={correctAnswer}
          onChange={onCorrectAnswerChange}
          required
        />
        <div className="m-4"></div>
      </div>
    );
  };

  const multipleChoiceQuestion = () => {
    return (
      <div>
        <div className="text-lg text-brown font-bold">Correct Answer</div>
        <div className="text-sm mb-1 text-brown">
          Answer order is randomised when presented
        </div>

        <input
          className="p-2.5 w-[100%] h-12 border-2 border-gray-300 rounded-md"
          type="text"
          placeholder="Enter The Correct Answer"
          value={correctAnswer}
          onChange={(e) => onCorrectAnswerChange(e)}
          required
        />
        <div className="m-4"></div>
        <div className="text-lg text-brown font-bold">Incorrect Answers</div>
        <div className="text-sm mb-1 text-brown">
          Provide between 1 and 3 incorrect answers
        </div>
        <input
          className="p-2.5 w-[100%] mb-1 h-12 border-2 border-gray-300 rounded-md"
          type="text"
          placeholder="Enter An Incorrect Answer"
          value={incorrectAnswers[0]}
          onChange={(e) => onIncorrectAnswerChange(e, 0)}
        />
        <input
          className="p-2.5 w-[100%] mb-1 h-12 border-2 border-gray-300 rounded-md"
          type="text"
          placeholder="Enter An Incorrect Answer"
          value={incorrectAnswers[1]}
          onChange={(e) => onIncorrectAnswerChange(e, 1)}
        />
        <input
          className="p-2.5 w-[100%] mb-1 h-12 border-2 border-gray-300 rounded-md"
          type="text"
          placeholder="Enter An Incorrect Answer"
          value={incorrectAnswers[2]}
          onChange={(e) => onIncorrectAnswerChange(e, 2)}
        />
        <div className="m-4"></div>
      </div>
    );
  };

  const handleSwitchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setMultipleChoice(checked);
  };

  const handleIncorrectAnswersNumChange = (e: SelectChangeEvent<number>) => {
    setIncorrectAnswersNum(Number(e.target.value));
  };

  return (
    <Container page="New Question" pages={pages} username={username}>
      <div className="flex justify-center">
        <div className="flex flex-row w-[700px] border-1 border-brown rounded p-4">
          <div className="pl-4 pr-4 pb-4 w-[100%] flex flex-col">
            <div className="text-4xl text-brown font-bold">New Question</div>
            <div className="mb-3"></div>
            <form
              className="flex flex-col"
              onSubmit={/*handleSubmit*/ () => {}}
            >
              <TextField
                id="Difficulty filter"
                sx={{
                  background: "#FFFFFF",
                  width: 600,
                  marginTop: 2,
                }}
                className=""
                label="Question"
                variant="filled"
                onChange={onQuestionChange}
                value={question}
                required
              />

              <div className="flex flex-col">
                <TextField
                  id="Difficulty filter"
                  sx={{
                    background: "#FFFFFF",
                    width: 600,
                    marginTop: 2,
                  }}
                  className=""
                  label="Answer"
                  variant="filled"
                  onChange={onCorrectAnswerChange}
                  value={correctAnswer}
                  required
                />
                <div className="flex ml-[10px] mt-[20px]">
                  <FormControlLabel
                    control={
                      <Switch
                        value={multipleChoice}
                        onChange={handleSwitchChange}
                      />
                    }
                    label={
                      <div className="text-xl text-brown font-bold ml-[30px]">
                        Multiple-choice
                      </div>
                    }
                  />
                </div>
              </div>
              {multipleChoice && (
                <div>
                  <div className="flex ml-[0px]">
                    <Select
                      sx={{
                        width: 60,
                        height: 60,
                        marginTop: 2,
                        background: "#f3f4f6",
                      }}
                      id="demo-simple-select"
                      value={incorrectAnswersNum}
                      onChange={handleIncorrectAnswersNumChange}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                    <div className="text-xl bg-gray-1 text-brown font-bold mt-[30px] ml-[25px]">
                      Incorrect answers
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {incorrectAnswers
                      .filter((ans, i) => incorrectAnswersNum > i)
                      .map((ans, i) => (
                        <TextField
                          id={`incorrect answer ${i}`}
                          sx={{
                            background: "#FFFFFF",
                            width: 600,
                            marginTop: 2,
                          }}
                          className=""
                          label={`Incorrect answer ${i + 1}`}
                          variant="filled"
                          onChange={(e) => onIncorrectAnswerChange(e, i)}
                          value={incorrectAnswers[i]}
                        />
                      ))}
                  </div>
                </div>
              )}

              <div className="m-2"></div>
              <div>
                <div className="mt-[30px]">
                  <div className="flex">
                    <TextField
                      id="tags"
                      sx={{
                        background: "#FFFFFF",
                        width: 520,
                        marginTop: 2,
                      }}
                      className=""
                      label="Tags"
                      variant="filled"
                      onChange={onCurrentTagChange}
                      value={currentTag}
                    />
                    <Fab
                      sx={{ marginLeft: 3, marginTop: 2 }}
                      color="primary"
                      aria-label="add"
                      onClick={handleAddTag}
                    >
                      <AddIcon />
                    </Fab>
                  </div>

                  <div className="w-[100%] flex flex-wrap">
                    {tags.map((tag, index) => (
                      <div className="flex items-center mt-[10px] mr-[10px]">
                        <div className="flex w-auto rounded-full bg-gray-300 items-center pr-[10px] pt-[5px] pb-[5px]">
                          <div className="text-[20px] mr-[10px] ml-[10px]">{`${tag}`}</div>
                          <div>
                            <button
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => handleDeleteTag(index)}
                            >
                              <CancelTwoToneIcon fontSize="medium"></CancelTwoToneIcon>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="">
                <div className="text-lg text-brown font-bold mt-4">
                  Difficulty
                </div>
                <NumbersRating
                  onValueChange={(v) => setDifficulty(v)}
                ></NumbersRating>
              </div>
              <button
                className="p-2.5 mt-[20px] w-[300px] bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
                type="submit"
              >
                ADD QUESTION
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};
