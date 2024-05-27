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
import { CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { GrFilter } from "react-icons/gr";

const DEFAULT_PAGE_SIZE = 5;

export interface IProps {
  token: Token;
  toMain: () => void;
  username: string | undefined;
  pages: Pages;
}

export const CreateQuestionaire = ({
  token,
  toMain,
  username,
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
  const [difficultyFilter, setDifficultyFilter] = useState<number | "">(1);
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

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
    difficulty: number | ""
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

  /*
  const qList: Question[] = [
    {
      id: "1",
      question: "What is the capital of Italy?",
      multipleChoice: false,
      answer: "Rome",
      incorrectAnswers: [],
      tags: ["geography", "capital cities"],
      difficulty: 1,
    },
    {
      id: "2",
      question: "Who is the author of '1984'?",
      multipleChoice: true,
      answer: "George Orwell",
      incorrectAnswers: ["J.K. Rowling", "Stephen King", "Ernest Hemingway"],
      tags: ["literature", "authors"],
      difficulty: 4,
    },
    {
      id: "3",
      question: "What is the chemical symbol for oxygen?",
      multipleChoice: false,
      answer: "O",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 3,
    },
    {
      id: "4",
      question: "Who is the lead singer of the band Queen?",
      multipleChoice: true,
      answer: "Freddie Mercury",
      incorrectAnswers: ["John Lennon", "Mick Jagger", "David Bowie"],
      tags: ["music", "bands"],
      difficulty: 2,
    },
    {
      id: "5",
      question: "What is the largest ocean on Earth?",
      multipleChoice: false,
      answer: "Pacific Ocean",
      incorrectAnswers: [],
      tags: ["geography", "oceans"],
      difficulty: 2,
    },
    {
      id: "6",
      question: "Who painted the famous painting 'Starry Night'?",
      multipleChoice: true,
      answer: "Vincent van Gogh",
      incorrectAnswers: ["Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      tags: ["art", "paintings"],
      difficulty: 4,
    },
    {
      id: "7",
      question: "What is the main ingredient in guacamole?",
      multipleChoice: false,
      answer: "Avocado",
      incorrectAnswers: [],
      tags: ["food", "ingredients"],
      difficulty: 1,
    },
    {
      id: "8",
      question: "What is the chemical symbol for sodium?",
      multipleChoice: false,
      answer: "Na",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 5,
    },
    {
      id: "9",
      question: "Who wrote the play 'Hamlet'?",
      multipleChoice: true,
      answer: "William Shakespeare",
      incorrectAnswers: ["Jane Austen", "Charles Dickens", "Fyodor Dostoevsky"],
      tags: ["literature", "plays"],
      difficulty: 3,
    },
    {
      id: "10",
      question: "What is the tallest mountain in Africa?",
      multipleChoice: false,
      answer: "Mount Kilimanjaro",
      incorrectAnswers: [],
      tags: ["geography", "mountains"],
      difficulty: 4,
    },
    {
      id: "11",
      question: "Who is the creator of the Harry Potter series?",
      multipleChoice: true,
      answer: "J.K. Rowling",
      incorrectAnswers: [
        "J.R.R. Tolkien",
        "George R.R. Martin",
        "Suzanne Collins",
      ],
      tags: ["literature", "authors"],
      difficulty: 2,
    },
    {
      id: "12",
      question: "What is the chemical symbol for gold?",
      multipleChoice: false,
      answer: "Au",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 1,
    },
    {
      id: "13",
      question: "Who painted the famous painting 'The Persistence of Memory'?",
      multipleChoice: true,
      answer: "Salvador Dalí",
      incorrectAnswers: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh"],
      tags: ["art", "paintings"],
      difficulty: 2,
    },
    {
      id: "14",
      question: "What is the currency of Japan?",
      multipleChoice: false,
      answer: "Japanese yen",
      incorrectAnswers: [],
      tags: ["economics", "currencies"],
      difficulty: 1,
    },
    {
      id: "15",
      question: "Who is the first woman to win a Nobel Prize?",
      multipleChoice: true,
      answer: "Marie Curie",
      incorrectAnswers: ["Amelia Earhart", "Rosa Parks", "Mother Teresa"],
      tags: ["history", "Nobel Prize"],
      difficulty: 2,
    },
    {
      id: "16",
      question: "What is the chemical symbol for helium?",
      multipleChoice: false,
      answer: "He",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 1,
    },
    {
      id: "17",
      question: "Who directed the movie 'The Shawshank Redemption'?",
      multipleChoice: true,
      answer: "Frank Darabont",
      incorrectAnswers: [
        "Quentin Tarantino",
        "Steven Spielberg",
        "Martin Scorsese",
      ],
      tags: ["movies", "directors"],
      difficulty: 2,
    },
    {
      id: "18",
      question: "What is the main ingredient in hummus?",
      multipleChoice: false,
      answer: "Chickpeas",
      incorrectAnswers: [],
      tags: ["food", "ingredients"],
      difficulty: 1,
    },
    {
      id: "19",
      question: "Who wrote the novel 'Pride and Prejudice'?",
      multipleChoice: true,
      answer: "Jane Austen",
      incorrectAnswers: ["Charlotte Brontë", "Emily Dickinson", "Leo Tolstoy"],
      tags: ["literature", "authors"],
      difficulty: 2,
    },
    {
      id: "20",
      question: "What is the chemical symbol for carbon?",
      multipleChoice: false,
      answer: "C",
      incorrectAnswers: [],
      tags: ["chemistry", "elements"],
      difficulty: 1,
    },
  ];
*/
  const showInanswers = (incorrectAnswers: string[]) => {
    const s = "";
    incorrectAnswers.forEach((a) => s.concat(a));
    return s;
  };
  /*
  const showQuestion = (q: Question, index: number) => {
    const bg =
      questionsIds.find((id) => id === q.id) !== undefined
        ? "#54D167"
        : index % 2 === 0
        ? "#e4e4e7"
        : "#f5f5f5";

    return (
      <div>
        <div className="flex p-2 m-4 rounded-xl" style={{ background: bg }}>
          <div className="min-w-[200px] pl-4 pt-2 font-bold rounded-lg border-1 border-black">
            <div>{`${
              q.multipleChoice ? "Multiple-choice" : "Open-question"
            }`}</div>
            <div className="">{`Difficulty: ${q.difficulty}`}</div>
            <div className="mb-2"></div>
            {q.tags.length > 0 && <div className="underline">Tags</div>}
            <div className="mb-2">
              {q.tags.map((t) => (
                <div className="mr-1">{`#${t}`}</div>
              ))}
            </div>
          </div>
          <div className="text-xl ml-3 w-[100%]">
            <div className="flex">
              <div className="mr-2">Q:</div>
              <div className="font-semibold">{`${q.question}`}</div>
            </div>
            <div className="flex">
              <div className="mr-2">A:</div>
              <div className="">
                <div className="flex">
                  <div className="font-semibold">{`${q.answer}`}</div>
                </div>
              </div>
            </div>
            {q.multipleChoice && (
              <div className="underline mt-3">Incorrect Answers</div>
            )}
            {q.incorrectAnswers.map((a, index) => (
              <div>{`${index + 1}) ${q.incorrectAnswers[index]}`}</div>
            ))}
          </div>

          <div className="min-w-[100px] flex items-center">
            {questionsIds.find((id) => id === q.id) === undefined && (
              <button
                className="w-[80px] h-[25px] text-cyan-900 text-5xl rounded-md flex justify-center items-center"
                type="button"
                onClick={() => setQuestionsIds(questionsIds.concat(q.id))}
              >
                <CiSquarePlus />
              </button>
            )}
            {questionsIds.find((id) => id === q.id) !== undefined && (
              <div>
              <div></div>
              <button
              className="w-[80px] h-[25px] text-cyan-900 text-5xl rounded-md flex justify-center items-center"
              type="button"
              onClick={() =>
                setQuestionsIds(questionsIds.filter((id) => id !== q.id))
              }
              >
                  <CiSquareRemove />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
*/
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

  const onDifficultyFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDifficultyFilter(Number(e.target.value));
  };

  const onTagsFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsFilter(e.target.value.split(","));
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
          <div className="flex items-center">
            <div className="mt-2 w-[85%]">
              <TextField
                id="Content filter"
                sx={{ background: "#FFFFFF" }}
                className="w-[100%]"
                label="Filter by question content"
                variant="filled"
                onChange={onContentFilterChange}
                value={contentFilter}
              />
              <TextField
                id="Difficulty filter"
                sx={{ background: "#FFFFFF" }}
                className="w-[100%]"
                label="Filter by Difficulty"
                variant="filled"
                onChange={onDifficultyFilterChange}
                value={difficultyFilter}
              />
              <TextField
                id="Tags filter"
                sx={{ background: "#FFFFFF" }}
                className="w-[100%]"
                label="Filter by tags"
                variant="filled"
                onChange={onTagsFilterChange}
                value={tagsFilter}
              />
            </div>
            <button
              className="text-[50px] ml-[20px] justify-center flex text-brown hover:text-amber-600 cursor-pointer"
              type="button"
              onClick={() =>
                fetchPage(0, pageSizeRequest, contentFilter, difficultyFilter)
              }
            >
              <GrFilter></GrFilter>
            </button>
          </div>
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

        <div className="mt-4 flex justify-center">
          <button
            className="p-2 w-[30%] bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
            type="submit"
          >
            Create Questionnaire
          </button>
        </div>
      </div>
    </Container>
  );
};

/*
<Tooltip title={<div className="text-[16px]">First</div>}>
<button className="mr-[15px]" onClick={handleFirst}>
  <First></First>
</button>
</Tooltip>
                <Tooltip title={<div className="text-[16px]">Last</div>}>
                <button className="ml-[15px]" onClick={handleLast}>
                  <Last></Last>
                </button>
              </Tooltip>
*/
