import React, { useState } from "react";
import Container from "../components/container";
import { Token, Question, Pages } from "../types";
import { server } from "../main";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { SelectQuestions } from "../components/questionsTable";

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
  >("");
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<
    "" | "open question" | "multiple choice"
  >("");
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  const handleChangeSelectedQuestions = (compSelectedQuestions: string[]) => {
    setSelectedQuestions(compSelectedQuestions);
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
      creatorId: token,
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
        toMain();
      })
      .catch((error) => alert(error));
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const allChecked: boolean = questions.every(
    (q) => selectedQuestions.find((qid) => qid === q.id) !== undefined
  );
  const allUnchecked: boolean = questions.every(
    (q) => selectedQuestions.find((qid) => qid === q.id) === undefined
  );
  /*
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
*/
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
        <SelectQuestions
          token={token}
          handleChangeInPage={handleChangeSelectedQuestions}
        ></SelectQuestions>
        {
          //questions.length === 0 && loadingPage && (
          //<Loading msg={"Loading Questions"} size={60}></Loading>
          //)
        }

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
