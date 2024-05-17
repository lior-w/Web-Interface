import React, { ReactNode, useState, useEffect } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import { ThemeContext } from "@emotion/react";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { Game, Token } from "../types";
import Loading from "../components/loading";
import { server } from "../main";

export interface IProps {
  token: Token;
  toMain: () => void;
  toGame: (runningGameId: string) => void;
  gameId: string | undefined;
}

const WaitingRoom = ({ token, toMain, toGame, gameId }: IProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [startingGame, setStartingGame] = useState<boolean>(false);
  const [gameName, setGameName] = useState<string>("");
  const [runningId, setRunningId] = useState<string>("");
  const [gameCode, setGameCode] = useState<string>("");
  const [players, setPlayers] = useState<string[]>([
    "Emily Johnson",
    "Michael Smith",
    "Olivia Brown",
    "Ethan Martinez",
    "Ava Anderson",
    "Noah Taylor",
    "Isabella Jackson",
    "Liam Thompson",
    "Sophia Harris",
    "Mason Wilson",
    "Charlotte White",
    "William Davis",
    "Amelia Lee",
    "Benjamin Clark",
    "Mia Rodriguez",
  ]);

  useEffect(() => {
    // const headers = {
    //   Authorization: token.AUTHORIZATION,
    // };
    const openWaitingRoom = async () => {
      const data = {
        gameId: gameId,
        userId: token.AUTHORIZATION,
      };
      const url = `${server}/running_game/open_waiting_room`;
      await axios
        .post(url, data)
        .then((response) => {
          console.log(response.data);
          setGameName(response.data.value.name);
          setGameCode(response.data.value.code);
          setRunningId(response.data.value.runningId);
          setLoading(false);
        })
        .catch((e) => alert(e));
    };

    openWaitingRoom();
  }, []);

  // Response.data = {
  //   "players": [
  //     {"name": player1 name, ...},
  //     {"name": player2 name, ...},
  //     .
  //     .
  //     .
  //   ],
  //   .
  //   .
  //   .
  // }

  const getPlayers = async () => {
    const url = "url";
    /*
    await axios
      .get(url)
      .then((response) => setPlayers(response.data.players))
      .catch((error) => alert(error));
      */
  };

  useEffect(() => {
    const interval = setInterval(() => getPlayers(), 1000);
    return () => clearInterval(interval);
  }, []);

  const startGame = async () => {
    setStartingGame(true);
    const headers = {
      Authorization: token.AUTHORIZATION,
    };
    const data = {
      gameId: runningId,
    };
    const url = `${server}/running_game/start_game`;
    await axios
      .post(url, data, { headers })
      .then((response) => console.log(response.data))
      .catch((e) => alert(e));

    toGame(runningId);
  };

  return (
    <Container page="" pages={{}} username={undefined}>
      {!startingGame && (
        <div>
          <div className="p-1 flex justify-end">
            <button
              className="text-3xl text-brown font-bold cursor-pointer hover:text-amber-700"
              type="button"
              onClick={toMain}
            >
              <IoArrowForwardCircle />
            </button>
          </div>
          {loading && <Loading msg="Loading Waiting Room"></Loading>}
          {!loading && (
            <div>
              <div className="flex flex-row">
                <div className="pl-4 pr-4 pb-4 w-[100%] flex flex-col">
                  <div className="text-4xl text-brown font-bold">{`${gameName} - Waiting Room`}</div>
                  <div className="mb-3"></div>
                </div>
              </div>
              <div className="p-4"></div>
              <div className="flex p-4 text-brown text-6xl font-bold justify-center">{`Game Code: ${gameCode}`}</div>
              <div className="p-4">
                <button
                  className="p-2.5 w-[100%] bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
                  type="button"
                  onClick={startGame}
                >
                  START GAME
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {startingGame && <Loading msg="Starting Game"></Loading>}
    </Container>
  );
};

export default WaitingRoom;

/*
<div className="text-2xl text-brown font-bold">Players:</div>
                <div className="flex flex-wrap">
                  {players.map((player) => (
                    <div className="text-lg text-brown font-semibold m-2">{`${player}`}</div>
                  ))}
                </div>
                <div className="text-xl text-brown font-bold">{`Total Amount: ${players.length}`}</div>*/
