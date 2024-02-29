import React, { useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import BrwonButton from "../components/brownButton";

export interface IProps {
  onLoginSuccess: () => void;
  onSignUp: () => void;
  toMain: () => void;
}

const CreateQuestion = ({ onLoginSuccess, onSignUp, toMain }: IProps) => {
  const [question, setQuestion] = useState<string>("");
  const [multipleChoice, setMultipleChoice] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [IncorrectAnswers, setIncorrectAnswers] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [difficulty, setDifficulity] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    multipleChoice && IncorrectAnswers.every((answer) => answer.length === 0)
      ? setErrorMessage(
          "Multiple-choice question has to contain atleast 1 incorrect answer"
        )
      : setErrorMessage("");
  };

  const handleBack = () => {
    toMain();
  };

  const handleAddTag = () => {
    currentTag.length > 0 ? setTags(tags.concat(currentTag)) : setTags(tags);
    setCurrentTag("");
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
      IncorrectAnswers.slice(0, index)
        .concat(e.target.value)
        .concat(IncorrectAnswers.slice(index + 1))
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
          className={`border-2 border-brown rounded-s-lg w-[70px] text-lg font-bold ${
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
          className={`border-2 border-brown rounded-e-lg w-[70px] text-lg font-bold ${
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
          value={IncorrectAnswers[0]}
          onChange={(e) => onIncorrectAnswerChange(e, 0)}
        />
        <input
          className="p-2.5 w-[100%] mb-1 h-12 border-2 border-gray-300 rounded-md"
          type="text"
          placeholder="Enter An Incorrect Answer"
          value={IncorrectAnswers[1]}
          onChange={(e) => onIncorrectAnswerChange(e, 1)}
        />
        <input
          className="p-2.5 w-[100%] mb-1 h-12 border-2 border-gray-300 rounded-md"
          type="text"
          placeholder="Enter An Incorrect Answer"
          value={IncorrectAnswers[2]}
          onChange={(e) => onIncorrectAnswerChange(e, 2)}
        />
        <div className="m-4"></div>
      </div>
    );
  };

  return (
    <Container>
      <div className="p-1 flex justify-end">
        <button
          className="text-3xl text-brown font-bold cursor-pointer"
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
                    className="p-2.5 w-[40%] h-12 border-2 border-gray-300 rounded-md"
                    type="text"
                    placeholder="#Tags"
                    value={currentTag}
                    onChange={onCurrentTagChange}
                    required
                  />
                  <div className="bg-brown text-orange-100 text-xl flex items-center hover:bg-amber-700 rounded-lg p-2">
                    <button className="" type="button" onClick={handleAddTag}>
                      ADD
                    </button>
                  </div>
                </div>

                <div className="border-1 w-[100%] flex flex-wrap">
                  {tags.map((tag, index) => (
                    <button className="bg-brown text-my_orange rounded-lg mr-1 p-1 mt-1">{`#${tag}`}</button>
                  ))}
                </div>
              </div>
            </div>
            <div>difficulty</div>
            <button
              className="p-2.5 bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
              type="submit"
            >
              ADD QUESTION
            </button>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CreateQuestion;
