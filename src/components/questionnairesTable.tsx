import React, { useEffect, useState } from "react";
import { Questionnaire, Questionnaire_filter, Token } from "../types";
import { server } from "../main";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import { FaAngleRight as Next } from "react-icons/fa";
import { FaAngleLeft as Back } from "react-icons/fa";
import { FaAngleDoubleRight as Last } from "react-icons/fa";
import { FaAngleDoubleLeft as First } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import BasicSelect from "../components/selectTool";
import { CircularProgress, TextField } from "@mui/material";
import { GrFilter } from "react-icons/gr";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DEFAULT_PAGE_SIZE = 5;

export interface IProps {
  handleChangeInPage: (selectedId: string) => void;
  selectedId: string;
  token: Token;
}

export const SelectQuestionnaire = ({
  handleChangeInPage,
  selectedId,
  token,
}: IProps) => {
  const [selectedQuestionnaire, setSelectedQuestionnaire] =
    useState<string>(selectedId);
  const [questionnaires, setQuestionnaires] = useState<Questionnaire_filter[]>(
    []
  );
  const [totalElements, setTotalElements] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(0);
  const [pageSizeRequest, setPageSizeRequest] =
    useState<number>(DEFAULT_PAGE_SIZE);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  const fetchPage = async (
    pageNum: number,
    size: number,
    name: string,
    id: string
  ) => {
    setLoadingPage(true);
    const url = `${server}/question/filter_questionnaires`;
    const params = {
      page: pageNum,
      size: size,
      name: name,
      id: id,
    };
    const headers = { AUTHORIZATION: token.AUTHORIZATION };
    await axios
      .get(url, { params: params, headers: headers })
      .then((response) => {
        setQuestionnaires(response.data.value.content);
        setTotalElements(response.data.value.totalElements);
        setTotalPages(response.data.value.totalPages);
        setPageNumber(response.data.value.number);
        setPageSize(response.data.value.size);
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
        nameFilter,
        token.AUTHORIZATION
      );
    }
  };

  const handleLast = () => {
    if (!isLast) {
      fetchPage(
        totalPages - 1,
        pageSizeRequest,
        nameFilter,
        token.AUTHORIZATION
      );
    }
  };

  const handleBack = () => {
    if (!isFirst) {
      fetchPage(
        pageNumber - 1,
        pageSizeRequest,
        nameFilter,
        token.AUTHORIZATION
      );
    }
  };

  const handleFirst = () => {
    if (!isFirst) {
      fetchPage(0, pageSizeRequest, nameFilter, token.AUTHORIZATION);
    }
  };

  useEffect(() => {
    fetchPage(0, pageSizeRequest, nameFilter, token.AUTHORIZATION);
  }, []);

  const handlePageSizeChange = (val: number) => {
    setPageSizeRequest(val);
    fetchPage(0, val, nameFilter, token.AUTHORIZATION);
  };

  const onNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  const handleChangeSelectedQuestionnaire = (questionnaireId: string) => {
    let selectedId: string = questionnaireId;
    if (questionnaireId === selectedQuestionnaire) {
      selectedId = "";
    }
    setSelectedQuestionnaire(selectedId);
    handleChangeInPage(selectedId);
  };

  return (
    <div>
      <div id="filters" className="flex items-end">
        <div className="flex items-end">
          <TextField
            id="Name filter"
            sx={{ width: 300, marginRight: 5 }}
            className=""
            label="Questionnaire name"
            variant="standard"
            onChange={onNameFilterChange}
            value={nameFilter}
          />
        </div>
        <Tooltip title={<div className="text-lg">Filter</div>}>
          <button
            className="text-[50px] ml-[20px] justify-center flex text-brown hover:text-amber-600 cursor-pointer"
            type="button"
            onClick={() =>
              fetchPage(0, pageSizeRequest, nameFilter, token.AUTHORIZATION)
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
                <th className="w-[3%]"></th>
                <th className="w-[97%] pl-[15px]">Questionnaire</th>
              </tr>
            </thead>
            <tbody>
              {questionnaires.map((q, i) => {
                return (
                  <tr className="border-y-2">
                    <td>
                      <div>
                        <Checkbox
                          onChange={() =>
                            handleChangeSelectedQuestionnaire(q.id)
                          }
                          checked={q.id === selectedQuestionnaire}
                        ></Checkbox>
                      </div>
                    </td>
                    <td>
                      <div>
                        <Accordion square={true} sx={{ boxShadow: "none" }}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <div className="w-[100%]">{q.name}</div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div>
                              {q.questions.map((question, index) => (
                                <div>{`${index + 1}. ${question}`}</div>
                              ))}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div id="bottom of the table" className="flex justify-between h-[60px]">
          <div id="" className="flex items-center ml-[20px]">
            <div className="mr-[10px]"></div>
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
                  `${pageNumber * pageSizeRequest + 1} - ${Math.min(
                    pageNumber * pageSizeRequest + pageSize,
                    totalElements
                  )} out of ${totalElements}`}
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

/*
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <div className="w-[100%]">{q.name}</div>
                        </AccordionSummary>
                        <AccordionDetails>
                          {q.questions.map((question) => (
                            <div>{question.question}</div>
                          ))}
                        </AccordionDetails>
                      </Accordion>
*/
