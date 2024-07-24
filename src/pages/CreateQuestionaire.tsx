import React, { useState } from "react";
import Container from "../components/container";
import { Token, Question, Pages } from "../types";
import { server } from "../main";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { SelectQuestions } from "../components/questionsTable";
import AddIcon from "@mui/icons-material/Add";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import { Fab, FormControlLabel, Switch } from "@mui/material";
import Tags from "../components/tags";

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_DIFFICULTY = 0;

export interface IProps {
  token: Token;
  username: string | undefined;
  pages: Pages;
}

export const CreateQuestionaire = ({ token, username, pages }: IProps) => {
  const [title, setTitle] = useState<string>("");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isShared, setIsShared] = useState<boolean>(false);

  const handleTagsChange = (tags: string[]) => {
    setTags(tags);
  };
  const handleChangeSelectedQuestions = (compSelectedQuestions: string[]) => {
    setSelectedQuestions(compSelectedQuestions);
  };

  const handlePublicSwitchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setIsShared(checked);
  };

  const generateQuestionsJSON = (): { [key: string]: number } => {
    return selectedQuestions.reduce((json, qid) => {
      json[qid] = DEFAULT_DIFFICULTY;
      return json;
    }, {} as { [key: string]: number });
  };

  const newQuestionnaireJSON = () => {
    return {
      title: title,
      tags: tags,
      creatorId: token.AUTHORIZATION,
      questionsIds: generateQuestionsJSON(),
    };
  };

  const handleSubmit = async () => {
    const url = `${server}/question/add_questionnaire`;
    const headers = { AUTHORIZATION: token.AUTHORIZATION };
    await axios
      .post(url, newQuestionnaireJSON(), { headers })
      .then((response) => {
        alert("New questionnaire has been created successfuly");
        pages["Main"]();
      })
      .catch((error) => alert(error));
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Container page="New Questionnaire" pages={pages} username={username}>
      <div id="page body" className=" p-4 w-[100%] flex flex-col">
        <div className="border-1 border-black rounded-md backdrop-blur-xl brightness-110 p-4">
          <div id="page title" className="text-4xl text-black font-bold">
            New Questionnaire
          </div>
          <div id="questionnaire title and filters" className="w-[500px]">
            <div id="questionnaire title" className="mt-5">
              <TextField
                id="title input"
                sx={{ background: "#FFFFFF" }}
                className="w-[100%]"
                label="Title"
                variant="filled"
                onChange={onTitleChange}
                value={title}
                required
              />
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
          <SelectQuestions
            token={token}
            handleChangeInPage={handleChangeSelectedQuestions}
          ></SelectQuestions>
          <div className="mt-4 flex justify-start">
            <button
              className="p-2 w-[300px] bg-blue-600 text-xl text-white hover:bg-blue-800 rounded-lg cursor-pointer"
              type="button"
              onClick={handleSubmit}
            >
              Create Questionnaire
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};
