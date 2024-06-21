import React, { useEffect, useState } from "react";
import { Question } from "../types";
import { server } from "../main";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import { FaAngleRight as Next } from "react-icons/fa";
import { FaAngleLeft as Back } from "react-icons/fa";
import { FaAngleDoubleRight as Last } from "react-icons/fa";
import { FaAngleDoubleLeft as First } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import BasicSelect from "../components/selectTool";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GrFilter } from "react-icons/gr";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { EditQuestion } from "./editQuestion";
import { DeleteQuestion } from "./deleteQuestion";

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_DIFFICULTY = 0;

export interface IProps {
  handleChangeInPage: (selected: string[]) => void;
}

export const SelectQuestions = ({ handleChangeInPage }: IProps) => {
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
  >("");
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<
    "" | "open question" | "multiple choice"
  >("");
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [edited, setEdited] = useState<string[]>([]);
  const [deleted, setDeleted] = useState<string[]>([]);

  const allChecked: boolean = questions.every(
    (q) => selectedQuestions.find((qid) => qid === q.id) !== undefined
  );
  const allUnchecked: boolean = questions.every(
    (q) => selectedQuestions.find((qid) => qid === q.id) === undefined
  );

  const handleChangeSelectedQuestions = (selected: string[]) => {
    setSelectedQuestions(selected);
    handleChangeInPage(selected);
  };

  const fetchPage = async (
    pageNum: number,
    size: number,
    difficulty: string,
    content: string
  ) => {
    setLoadingPage(true);
    const url = `${server}/question/filter_questions`;
    const params = {
      page: pageNum,
      size: size,
      difficulty: difficulty,
      content: content,
    };
    await axios
      .get(url, { params })
      .then((response) => {
        setQuestions(response.data.value.content);
        setTotalElements(response.data.value.totalElements);
        setTotalPages(response.data.value.totalPages);
        setPageNumber(response.data.value.number);
        setPageSize(response.data.value.numberOfElements);
        setIsFirst(response.data.value.first);
        setIsLast(response.data.value.last);
        setLoadingPage(false);
        setEdited([]);
        setDeleted([]);
      })
      .catch((error) => alert(error));
  };

  const handleNext = () => {
    if (!isLast) {
      fetchPage(
        pageNumber + 1,
        pageSizeRequest,
        difficultyFilter,
        contentFilter
      );
    }
  };

  const handleLast = () => {
    if (!isLast) {
      fetchPage(
        totalPages - 1,
        pageSizeRequest,
        difficultyFilter,
        contentFilter
      );
    }
  };

  const handleBack = () => {
    if (!isFirst) {
      fetchPage(
        pageNumber - 1,
        pageSizeRequest,
        difficultyFilter,
        contentFilter
      );
    }
  };

  const handleFirst = () => {
    if (!isFirst) {
      fetchPage(0, pageSizeRequest, difficultyFilter, contentFilter);
    }
  };

  useEffect(() => {
    fetchPage(0, pageSizeRequest, difficultyFilter, contentFilter);
  }, []);

  const handleChangeCheckBox = (questionId: string) => {
    selectedQuestions.find((qid) => qid === questionId) === undefined
      ? handleChangeSelectedQuestions(selectedQuestions.concat(questionId))
      : handleChangeSelectedQuestions(
          selectedQuestions.filter((qid) => qid !== questionId)
        );
  };

  const handleChangeHeadCheckBox = () => {
    allChecked
      ? handleChangeSelectedQuestions(
          selectedQuestions.filter(
            (qid) => questions.find((q) => q.id === qid) === undefined
          )
        )
      : handleChangeSelectedQuestions(
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
    fetchPage(0, val, difficultyFilter, contentFilter);
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

  const handleEdit = (id: string) => {
    console.log(`edit ${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`delete ${id}`);
  };

  const uint8ArrayToBase64 = (array: Uint8Array): string => {
    console.log(array);
    let binaryString = "";
    for (let i = 0; i < array.length; i++) {
      binaryString += String.fromCharCode(array[i]);
    }
    return btoa(binaryString);
  };

  return (
    <div>
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
              fetchPage(0, pageSizeRequest, difficultyFilter, contentFilter)
            }
          >
            <GrFilter></GrFilter>
          </button>
        </Tooltip>
      </div>
      <div className="mb-3"></div>
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
                <th className="w-[26%]">Question</th>
                <th className="w-[20%] pl-[17px]">Answer</th>
                <th className="w-[10%]">Type</th>
                <th className="w-[10%]">Difficulty</th>
                <th className="w-[20%]">Tags</th>
                <th className="w-[3%]">
                  <div></div>
                </th>
                <th className="w-[3%]">
                  <div></div>
                </th>
                <th className="w-[3%]">
                  <div></div>
                </th>
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
                            selectedQuestions.find((qid) => qid === q.id) !==
                            undefined
                          }
                        ></Checkbox>
                      </div>
                    </td>
                    <td>
                      <div className="w-[90%]">
                        {
                          <div>
                            <div>{q.question}</div>
                            {deleted.find((id) => id === q.id) !== undefined ? (
                              <div>{"(Deleted)"}</div>
                            ) : edited.find((id) => id === q.id) !==
                              undefined ? (
                              <div>{"(Edited)"}</div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        }
                      </div>
                    </td>
                    <td className="flex">
                      <div>
                        {q.multipleChoice === false && (
                          <div className="pl-[17px]">
                            {q.answers[0].answerText}
                          </div>
                        )}
                        {q.multipleChoice === true && (
                          <Accordion square={true} sx={{ boxShadow: "none" }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <div className="w-[100%]">
                                {
                                  q.answers.find(
                                    (answer) => answer.correct === true
                                  )?.answerText
                                }
                              </div>
                            </AccordionSummary>
                            <AccordionDetails>
                              <div>
                                <div className="font-bold">
                                  Incorrect answers
                                </div>
                                <div>
                                  {q.answers
                                    .filter(
                                      (answer) => answer.correct === false
                                    )
                                    .map((ans) => (
                                      <div>{`${ans.answerText}`}</div>
                                    ))}
                                </div>
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        )}
                      </div>
                    </td>
                    <td>
                      {q.multipleChoice ? "multiple choice" : "open question"}
                    </td>
                    <td>{q.difficulty}</td>
                    <td>{q.tags}</td>
                    <td>
                      {q.image && (
                        <img src={`data:image/png;base64,${q.image}`} />
                      )}
                    </td>
                    <td className="">
                      <div>
                        <EditQuestion
                          q={q}
                          onEdit={(id) => setEdited(edited.concat(id))}
                        ></EditQuestion>
                      </div>
                    </td>
                    <td className="">
                      <div>
                        <DeleteQuestion
                          q={q}
                          onDelete={(id) => setDeleted(deleted.concat(id))}
                        ></DeleteQuestion>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div id="bottom of the table" className="flex justify-between h-[60px]">
          <div id="number of questions" className="flex items-center ml-[20px]">
            <div className="mr-[10px]">Number of questions selected:</div>
            <div>{selectedQuestions.length}</div>
          </div>
          <div id="paging" className="mr-[20px] flex justify-end items-center">
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
                    pageNumber * pageSizeRequest + pageSize
                  } out of ${totalElements}`}
                {loadingPage && <CircularProgress color="info" size={30} />}
              </div>
              <div
                id="buttons"
                className="text-[24px] w-[140px] flex justify-between text-blue-500"
              >
                <div id="maybe first and back">
                  {pageNumber === 0 ? (
                    <div
                      id="first and back gray"
                      className="flex text-gray-300"
                    >
                      <div className="mr-[16px]">
                        <First></First>
                      </div>
                      <div>
                        <Back></Back>
                      </div>
                    </div>
                  ) : (
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
                  {pageNumber < totalPages - 1 ? (
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
                  ) : (
                    <div id="next and last gray" className="flex text-gray-300">
                      <div className="mr-[16px]">
                        <Next></Next>
                      </div>
                      <div>
                        <Last></Last>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
