import React, { ChangeEvent, useState } from "react";
import Container from "../components/container";
import NumbersRating from "../components/starRating";
import { Token, Question, Pages } from "../types";
import { server } from "../main";
import AddIcon from "@mui/icons-material/Add";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import {
  Fab,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import axios from "axios";
import Tags from "../components/tags";

export interface IProps {
  token: Token;
  username: string | undefined;
  pages: Pages;
}

export const CreateQuestion = ({ token, username, pages }: IProps) => {
  const [file, setFile] = useState<string>();
  const [image, setImage] = useState<string>();
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
  const [tags, setTags] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isShared, setIsShared] = useState<boolean>(false);

  const newQuestionJSON = () => {
    return {
      question: question,
      multipleChoice: multipleChoice,
      correctAnswer: correctAnswer,
      incorrectAnswers: incorrectAnswers,
      tags: tags,
      difficulty: difficulty,
      creatorId: token.AUTHORIZATION,
      image: image,
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (difficulty === null) {
      setErrorMessage("Please select question difficulty");
    } else {
      const url = `${server}/question/add_question`;
      const headers = { AUTHORIZATION: token.AUTHORIZATION };
      await axios
        .post(url, newQuestionJSON(), { headers })
        .then((response) => {
          alert("New question has been created successfuly");
          pages["Main"]();
        })
        .catch((error) => alert(error));
    }
  };

  const handleTagsChange = (tags: string[]) => {
    setTags(tags);
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
  const onOpenClick = () => {
    setMultipleChoice(false);
  };

  const onMultiClick = () => {
    setMultipleChoice(true);
  };

  const handleMultipleChoiceSwitchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setMultipleChoice(checked);
  };

  const handlePublicSwitchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setIsShared(checked);
  };

  const handleIncorrectAnswersNumChange = (e: SelectChangeEvent<number>) => {
    setIncorrectAnswersNum(Number(e.target.value));
  };

  function uint8ArrayToBase64(array: Uint8Array): string {
    let binaryString = "";
    for (let i = 0; i < array.length; i++) {
      binaryString += String.fromCharCode(array[i]);
    }
    return btoa(binaryString);
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          const arrayBuffer = event.target.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          console.log(uint8Array.buffer);
          setImage(uint8ArrayToBase64(uint8Array));
        }
      };

      reader.readAsArrayBuffer(selectedFile);
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <Container page="New Question" pages={pages} username={username}>
      <div className="flex justify-center p-[30px]">
        <div className="flex flex-row w-[700px] backdrop-blur-xl brightness-110 border-black border-1 border-blac rounded p-4">
          <div className="pl-4 pr-4 pb-4 w-[100%] flex flex-col">
            <div className="text-4xl text-black font-bold">New Question</div>
            <div className="mb-3"></div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div>
                <TextField
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
                <div className="flex mt-[20px]">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={multipleChoice}
                        onChange={handleMultipleChoiceSwitchChange}
                      />
                    }
                    label={
                      <div className="text-xl text-black font-bold ml-[30px]">
                        Multiple-choice
                      </div>
                    }
                  />
                </div>

                <div className="flex flex-col">
                  <TextField
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
                        <div className="text-xl bg-gray-1 text-black font-bold mt-[30px] ml-[25px]">
                          Incorrect answers
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="mt-[10px]">
                          No worries, the answers will appear in a random order
                        </div>
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
                  <div className="mb-2 mt-[20px]">
                    <div className="text-xl text-black ">{`Uplaod Image (optional)`}</div>
                    <div className="flex mt-[10px]">
                      <input type="file" onChange={handleFileChange} />
                      {file && (
                        <button
                          onClick={() => {
                            setFile(undefined);
                            setImage(undefined);
                          }}
                        >
                          {"(reset)"}
                        </button>
                      )}
                    </div>
                    <img src={file} />
                  </div>
                </div>
                <FormControlLabel
                  sx={{
                    marginTop: 2,
                  }}
                  control={
                    <Switch
                      checked={isShared}
                      onChange={handlePublicSwitchChange}
                    />
                  }
                  label={
                    <div className="text-xl text-black font-bold ml-[30px]">
                      Public
                    </div>
                  }
                />
              </div>

              <Tags originTags={tags} onChange={handleTagsChange} />
              <div className="">
                <div className="text-lg text-black font-bold mt-4">
                  Difficulty
                </div>
                <NumbersRating
                  onValueChange={(v) => {
                    setDifficulty(v);
                    setErrorMessage("");
                  }}
                ></NumbersRating>
              </div>
              <button
                className="p-2.5 mt-[20px] w-[300px] bg-blue-600 text-xl text-white hover:bg-blue-800 rounded-lg cursor-pointer"
                type="submit"
              >
                ADD QUESTION
              </button>
              {errorMessage !== "" && (
                <div className="text-red-500">{errorMessage}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};
