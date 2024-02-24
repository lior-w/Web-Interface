import React, { useState } from "react";
import Container from "../components/container";
import BrwonButton from "../components/brownButton";
import { TiArrowForward } from "react-icons/ti";
import { BsArrowClockwise } from "react-icons/bs";
import { IoArrowForwardCircle } from "react-icons/io5";

export interface IProps {
  onLoginSuccess: () => void;
  onSignUp: () => void;
  toMain: () => void;
}

const CreateQuestion = ({ onLoginSuccess, onSignUp, toMain }: IProps) => {
  const [question, setQuestion] = useState<string>("");
  const [multiChoice, setMultiChoice] = useState<boolean>(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [difficulty, setDifficulity] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = () => {
    setAnswers([currentAnswer]);
  };

  const handleSignUp = () => {
    onSignUp();
  };

  const handleForgotPassword = () => {};

  const handleBack = () => {
    toMain();
  };

  const onQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const onCurrentAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAnswer(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const onMultiChoiceChange = () => {
    setMultiChoice(!multiChoice);
  };

  const onOpenClick = () => {
    setMultiChoice(false);
  };

  const onMultiClick = () => {
    setMultiChoice(true);
  };

  const twoOptions = () => {
    return (
      <div>
        <button
          className={`border-2 border-brown rounded-s-lg w-[70px] text-lg font-bold ${
            multiChoice
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
            !multiChoice
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

  const multiChoiceQuestion = () => {
    return <div>multi choice</div>;
  };

  const openQuestion = () => {
    return (
      <div>
        <input
          className="p-2.5 w-[100%] h-12 border-2 border-gray-300 rounded-md"
          type="text"
          placeholder="Enter The Answer"
          value={currentAnswer}
          onChange={onCurrentAnswerChange}
          required
        />
        <div className="m-4"></div>
        <button
          className="p-2.5 bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
          type="submit"
        >
          ADD QUESTION
        </button>
      </div>
    );
  };

  return (
    <Container>
      <div className="flex flex-row">
        <div className="p-4 w-[100%] flex flex-col">
          <div className="text-4xl text-brown font-bold">New Question</div>
          <div className="m-3"></div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="">
              <input
                className="p-2.5 w-[100%] h-12 border-2 border-gray-300 rounded-md"
                type="text"
                placeholder="Enter The Question"
                value={question}
                onChange={onQuestionChange}
                required
              />
              <div className="m-2"></div>
              <div className="p-1 w-[100%] h-12 flex items-center">
                <div className="text-lg text-brown font-bold min-w-[280px]">
                  Open Question / Multi Choice:
                </div>
                {twoOptions()}
              </div>
              <div className="m-2"></div>
              {multiChoice ? multiChoiceQuestion() : openQuestion()}
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CreateQuestion;
