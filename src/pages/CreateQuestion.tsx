import React, { useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import NumbersRating from "../components/starRating";
import { Token, Question, Pages } from "../types";
import { server } from "../main";
import Navigation from "../components/navigation";

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
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [deletables, setDeletabels] = useState<boolean[]>([]);
  const [difficulty, setDifficulty] = useState<number | null>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const handleBack = () => {
    toMain();
  };

  const addTag = (tag: string) => {
    tag[0] === "#"
      ? setTags(tags.concat(tag.slice(1)))
      : setTags(tags.concat(tag));
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
    e: React.ChangeEvent<HTMLInputElement>,
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

  return (
    <Container page="New Question" pages={pages} username={username}>
      <div className="p-1 flex justify-end">
        <button
          className="text-3xl text-brown font-bold cursor-pointer hover:text-amber-700"
          type="button"
          onClick={handleBack}
        >
          <IoArrowForwardCircle />
        </button>
      </div>
      <div className="flex flex-row">
        <div className="pl-4 pr-4 pb-4 w-[100%] flex flex-col">
          <div className="text-4xl text-brown font-bold">New Question</div>
          <div className="mb-3"></div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="">
              <div className="text-lg text-brown font-bold">Question</div>
              <input
                className="p-2.5 w-[100%] h-12 border-2 border-gray-300 rounded-md"
                type="text"
                placeholder="Enter The Question"
                value={question}
                onChange={onQuestionChange}
                required
              />
              <div className="mb-2"></div>

              <div className="w-[100%] h-12 flex items-center">
                <div className="text-lg text-brown font-bold min-w-[300px]">
                  Open-ended / Multiple-choice :
                </div>
                {twoOptions()}
              </div>
              {multipleChoice ? multipleChoiceQuestion() : openQuestion()}
              <div className="m-2"></div>
            </div>
            <div>
              <div className="text-lg text-brown font-bold">Tags</div>
              <div className="">
                <div className="flex">
                  <input
                    className="p-2.5 mr-1 w-[40%] h-12 border-2 border-gray-300 rounded-md"
                    type="text"
                    placeholder="#Tags"
                    value={currentTag}
                    onChange={onCurrentTagChange}
                  />
                  <div className="h-12 flex items-center">
                    <div className="bg-brown h-11 text-orange-100 text-xl hover:bg-amber-700 rounded-lg p-2">
                      <button className="" type="button" onClick={handleAddTag}>
                        ADD
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-[100%] flex flex-wrap">
                  {tags.map((tag, index) => (
                    <div className="flex items-center mt-1">
                      <button
                        className="bg-brown text-my_orange rounded-md pr-1 pl-1 pt-0.5 pb-0.5 hover:bg-amber-700"
                        type="button"
                        onClick={(e) => onTagClick(index)}
                      >{`#${tag}`}</button>
                      {deletables[index] ? (
                        <button
                          className="text-brown text-sm flex items-center"
                          type="button"
                          onClick={(e) => handleDeleteTag(index)}
                        >
                          <FaRegTrashCan />
                        </button>
                      ) : (
                        <div></div>
                      )}
                      <div className="m-1"></div>
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
              className="p-2.5 bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
              type="submit"
            >
              ADD QUESTION
            </button>
            {errorMessage && multipleChoice && (
              <div className="text-red-500 mt-2 text-center text-md font-semibold">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </Container>
  );
};
