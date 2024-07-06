import { useState, useEffect } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import axios from "axios";
import { Pages, Token } from "../types";
import Loading from "../components/loading";
import { server } from "../main";

export interface IProps {
  token: Token;
  runningGameId: string | undefined;
  pages: Pages;
}

export const PostGame = ({ token, runningGameId, pages }: IProps) => {
  const [timeStarted, setTimeStarted] = useState<string>();
  const [timeEnded, setTimeEnded] = useState<string>();
  const [questionsAnswered, setQuestionsAnswered] = useState<number>();
  const [correctAnswers, setCorrectAnswers] = useState<number>();

  const getStats = async () => {
    const url = `${server}/running_game/get_game_statistic/${runningGameId}`;
    const headers = { AUTHORIZATION: token.AUTHORIZATION };
    await axios
      .get(url, { headers })
      .then((response) => {
        setTimeStarted(response.data.value.timeStarted);
        setTimeEnded(response.data.value.timeEnded);
        setQuestionsAnswered(response.data.value.questionsAnswered);
        setCorrectAnswers(response.data.value.correctAnswers);

        console.log(response.data);
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <Container page="" pages={{}} username={undefined}>
      <div className="flex flex-col items-center justify-center">
        <div className="border-2 border-brown rounded-lg p-2">
          <div className="text-4xl text-brown mt-2">Game Statistics:</div>
          <div className="text-2xl text-brown mt-2">{`Time started: ${timeStarted}`}</div>
          <div className="text-2xl text-brown mt-2">{`Time Ended: ${timeEnded}`}</div>
          <div className="text-2xl text-brown mt-2">{`Questions answered: ${questionsAnswered}`}</div>
          <div className="text-2xl text-brown mt-2">{`Correct Answers: ${correctAnswers}`}</div>
          <button
            className="text-2xl text-brown font-bold mt-6"
            onClick={pages["Main"]}
          >
            To Main
          </button>
        </div>
      </div>
    </Container>
  );
};

/*
 */
