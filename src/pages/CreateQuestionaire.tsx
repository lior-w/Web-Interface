import React, { useEffect, useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import Grid from "@mui/material/Grid";
import { Token, Question, Pages } from "../types";
import { CiSquareRemove } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { server } from "../main";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import { FaAngleRight as Next } from "react-icons/fa";
import { FaAngleLeft as Back } from "react-icons/fa";
import { FaAngleDoubleRight as Last } from "react-icons/fa";
import { FaAngleDoubleLeft as First } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import SelectTool from "../components/selectTool";
import NativeSelectComp from "../components/selectTool";
import BasicSelect from "../components/selectTool";
import Loading from "../components/loading";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { GrFilter } from "react-icons/gr";
import { SelectChangeEvent } from "@mui/material/Select";

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_DIFFICULTY = 0;

export interface IProps {
  token: Token;
  username: string | undefined;
  toMain: () => void;
  pages: Pages;
}

export const CreateQuestionaire = ({
  token,
  username,
  toMain,
  pages,
}: IProps) => {
  const [title, setTitle] = useState<string>("");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(0);
  const [pageSizeRequest, setPageSizeRequest] =
    useState<number>(DEFAULT_PAGE_SIZE);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [contentFilter, setContentFilter] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<
    "" | "1" | "2" | "3" | "4" | "5"
  >("1");
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<
    "" | "open question" | "multiple choice"
  >("");
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  const generateQuestionsJSON = (): { [key: string]: number } => {
    return selectedQuestions.reduce((json, qid) => {
      json[qid] = DEFAULT_DIFFICULTY;
      return json;
    }, {} as { [key: string]: number });
  };

  const newQuestionnaireJSON = () => {
    return {
      title: title,
      creatorId: token,
      questionsIds: generateQuestionsJSON(),
    };
  };

  const handleSubmit = async () => {
    const url = `${server}/question/add_questionnaire`;
    await axios
      .post(url, newQuestionnaireJSON())
      .then((response) => {
        alert("New questionnaire has been created successfuly");
        toMain();
      })
      .catch((error) => alert(error));
  };

  const allChecked: boolean = questions.every(
    (q) => selectedQuestions.find((qid) => qid === q.id) !== undefined
  );
  const allUnchecked: boolean = questions.every(
    (q) => selectedQuestions.find((qid) => qid === q.id) === undefined
  );

  const fetchPage = async (
    pageNum: number,
    size: number,
    content: string,
    difficulty: string
  ) => {
    setLoadingPage(true);
    const url = `${server}/question/filter_questions/page=${pageNum}&size=${size}&content=${content}&difficulty=${difficulty}`;
    await axios
      .get(url)
      .then((response) => {
        setQuestions(response.data.value.content);
        setTotalElements(response.data.value.totalElements);
        setTotalPages(response.data.value.totalPages);
        setPageNumber(response.data.value.number);
        setPageSize(response.data.value.numberOfElements);
        setIsFirst(response.data.value.first);
        setIsLast(response.data.value.last);
        setLoadingPage(false);
      })
      .catch((error) => alert(error));
  };

  const handleNext = () => {
    if (!isLast) {
      fetchPage(
        pageNumber + 1,
        pageSizeRequest,
        contentFilter,
        difficultyFilter
      );
    }
  };

  const handleLast = () => {
    if (!isLast) {
      fetchPage(
        totalPages - 1,
        pageSizeRequest,
        contentFilter,
        difficultyFilter
      );
    }
  };

  const handleBack = () => {
    if (!isFirst) {
      fetchPage(
        pageNumber - 1,
        pageSizeRequest,
        contentFilter,
        difficultyFilter
      );
    }
  };

  const handleFirst = () => {
    if (!isFirst) {
      fetchPage(0, pageSizeRequest, contentFilter, difficultyFilter);
    }
  };

  useEffect(() => {
    fetchPage(0, pageSizeRequest, "", difficultyFilter);
  }, []);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeCheckBox = (questionId: string) => {
    selectedQuestions.find((qid) => qid === questionId) === undefined
      ? setSelectedQuestions(selectedQuestions.concat(questionId))
      : setSelectedQuestions(
          selectedQuestions.filter((qid) => qid !== questionId)
        );
  };

  const handleChangeHeadCheckBox = () => {
    allChecked
      ? setSelectedQuestions(
          selectedQuestions.filter(
            (qid) => questions.find((q) => q.id === qid) === undefined
          )
        )
      : setSelectedQuestions(
          selectedQuestions.concat(
            questions
              .filter(
                (q) =>
                  selectedQuestions.find((qid) => qid === q.id) === undefined
              )
              .map((q) => q.id)
          )
        );
  };

  const handlePageSizeChange = (val: number) => {
    setPageSizeRequest(val);
    fetchPage(0, val, contentFilter, difficultyFilter);
  };

  const onContentFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentFilter(e.target.value);
  };

  const onDifficultyFilterChange = (e: SelectChangeEvent) => {
    if (
      e.target.value === "" ||
      e.target.value === "1" ||
      e.target.value === "2" ||
      e.target.value === "3" ||
      e.target.value === "4" ||
      e.target.value === "5"
    ) {
      setDifficultyFilter(e.target.value);
    }
  };

  const onTagsFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsFilter(e.target.value.split(","));
  };

  const onTypeFilterChange = (e: SelectChangeEvent) => {
    if (
      e.target.value === "" ||
      e.target.value === "open question" ||
      e.target.value === "multiple choice"
    ) {
      setTypeFilter(e.target.value);
    }
  };

  return (
    <Container page="New Questionnaire" pages={pages} username={username}>
      <div id="page body" className="pl-4 pr-4 pb-4 w-[100%] flex flex-col">
        <div id="page title" className="text-4xl text-brown font-bold">
          New Questionnaire
        </div>
        <div id="questionnaire title and filters" className="w-[500px]">
          <div id="questionnaire title" className="mt-5 mb-5">
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
        </div>
        <div id="filters" className="flex items-end">
          <div className="flex items-end">
            <TextField
              id="Content filter"
              sx={{ width: 300, marginRight: 5 }}
              className=""
              label="Question content"
              variant="standard"
              onChange={onContentFilterChange}
              value={contentFilter}
            />
            <TextField
              id="Tags filter"
              sx={{ width: 300, marginRight: 5 }}
              className=""
              label="Tags"
              variant="standard"
              onChange={onTagsFilterChange}
              value={tagsFilter}
            />
            <FormControl variant="standard" sx={{ width: 200, marginRight: 5 }}>
              <InputLabel id="label1">Difficulty</InputLabel>
              <Select
                labelId="label1"
                label="Difficulty"
                value={difficultyFilter}
                onChange={onDifficultyFilterChange}
                variant="standard"
              >
                {["any", "1", "2", "3", "4", "5"].map((option) => (
                  <MenuItem key={option} value={option === "any" ? "" : option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ width: 200, marginRight: 1 }}>
              <InputLabel id="label2">Type</InputLabel>
              <Select
                labelId="label2"
                label="Type"
                value={typeFilter}
                onChange={onTypeFilterChange}
                variant="standard"
              >
                {["any", "open question", "multiple choice"].map((option) => (
                  <MenuItem key={option} value={option === "any" ? "" : option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Tooltip title={<div className="text-lg">Filter</div>}>
            <button
              className="text-[50px] ml-[20px] justify-center flex text-brown hover:text-amber-600 cursor-pointer"
              type="button"
              onClick={() =>
                fetchPage(0, pageSizeRequest, contentFilter, difficultyFilter)
              }
            >
              <GrFilter></GrFilter>
            </button>
          </Tooltip>
        </div>
        <div className="mb-3"></div>
        {questions.length > 0 && (
          <div className="max-h-[100%] rounded-md bg-white">
            <div className="">
              <table className="w-[100%]">
                <thead>
                  <tr className="h-[50px] text-lg">
                    <th className="w-[3%]">
                      <div>
                        <Checkbox
                          onChange={() =>
                            questions.map((q) => handleChangeHeadCheckBox())
                          }
                          checked={questions.every(
                            (q) =>
                              selectedQuestions.find((qid) => qid === q.id) !==
                              undefined
                          )}
                        ></Checkbox>
                      </div>
                    </th>
                    <th className="w-[32%]">Question</th>
                    <th className="w-[20%]">Answer</th>
                    <th className="w-[10%]">Type</th>
                    <th className="w-[10%]">Difficulty</th>
                    <th className="w-[20%]">Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q, i) => {
                    return (
                      <tr className="border-y-2">
                        <td className="flex items-center text-3xl">
                          <div>
                            <Checkbox
                              onChange={() => handleChangeCheckBox(q.id)}
                              checked={
                                selectedQuestions.find(
                                  (qid) => qid === q.id
                                ) !== undefined
                              }
                            ></Checkbox>
                          </div>
                        </td>
                        <td>
                          <div className="w-[90%]">{q.question}</div>
                        </td>
                        <td className="flex">
                          <div>
                            {
                              q.answers.find(
                                (answer) => answer.correct === true
                              )?.answerText
                            }
                          </div>
                        </td>
                        <td>
                          {q.multipleChoice
                            ? "multiple choice"
                            : "open question"}
                        </td>
                        <td>{q.difficulty}</td>
                        <td>{q.tags}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div
              id="bottom of the table"
              className="flex justify-between h-[60px]"
            >
              <div
                id="number of questions"
                className="flex items-center ml-[20px]"
              >
                <div className="mr-[10px]">Number of questions selected:</div>
                <div>{selectedQuestions.length}</div>
              </div>
              <div
                id="paging"
                className="mr-[20px] flex justify-end items-center"
              >
                <div
                  id="rows per page"
                  className="flex items-center text-[18px] mr-[20px]"
                >
                  <div className="mr-3">Rows per page:</div>
                  <BasicSelect
                    values={[5, 10, 25, 50, 100]}
                    defaultValue={5}
                    func={handlePageSizeChange}
                  ></BasicSelect>
                </div>
                <div id="elements out of total and buttons" className="flex">
                  <div
                    id="elements out of total"
                    className="mr-[20px] w-[180px] flex justify-center"
                  >
                    {!loadingPage &&
                      `${pageNumber * pageSizeRequest + 1} - ${
                        pageNumber * pageSize + pageSizeRequest
                      } out of ${totalElements}`}
                    {loadingPage && <CircularProgress color="info" size={30} />}
                  </div>
                  <div
                    id="buttons"
                    className="text-[24px] w-[140px] flex justify-between text-blue-500"
                  >
                    <div id="maybe first and back">
                      {pageNumber > 0 && (
                        <div id="first and back" className="flex">
                          <Tooltip
                            id="first"
                            className="mr-[16px]"
                            title={<div className="text-lg">First</div>}
                          >
                            <button className="" onClick={handleFirst}>
                              <First></First>
                            </button>
                          </Tooltip>
                          <Tooltip
                            id="back"
                            title={<div className="text-lg">Back</div>}
                          >
                            <button onClick={handleBack}>
                              <Back></Back>
                            </button>
                          </Tooltip>
                        </div>
                      )}
                    </div>
                    <div id="maybe next and last">
                      {pageNumber < totalPages - 1 && (
                        <div id="next and last" className="flex">
                          <Tooltip
                            className="mr-[16px]"
                            title={<div className="text-lg">Next</div>}
                          >
                            <button onClick={handleNext}>
                              <Next></Next>
                            </button>
                          </Tooltip>
                          <Tooltip title={<div className="text-lg">Last</div>}>
                            <button onClick={handleLast}>
                              <Last></Last>
                            </button>
                          </Tooltip>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {questions.length === 0 && loadingPage && (
          <Loading msg={"Loading Questions"} size={60}></Loading>
        )}

        <div className="mt-4 flex justify-start">
          <button
            className="p-2 w-[300px] bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
            type="button"
            onClick={handleSubmit}
          >
            Create Questionnaire
          </button>
        </div>
      </div>
    </Container>
  );
};
