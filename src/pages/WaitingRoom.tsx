import React, { ReactNode, useState, useEffect } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import { ThemeContext } from "@emotion/react";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { Game, Token } from "../types";

export interface IProps {
  token: Token;
  toMain: () => void;
  toGame: () => void;
  game: Game;
}

const WaitingRoom = ({ token, toMain, toGame, game }: IProps) => {
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

  const getCode = async () => {
    const url = "url";
    /*
    await axios
    .get(url)
    .then((response) => setGameCode(response.data.gameCode))
    .catch((error) => alert(error));
    */
    console.log("code1");
  };
  getCode();

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

  const startGame = () => {
    toGame();
  };

  return (
    <Container w="80%" h="auto">
      <div className="p-1 flex justify-end">
        <button
          className="text-3xl text-brown font-bold cursor-pointer hover:text-amber-700"
          type="button"
          onClick={toMain}
        >
          <IoArrowForwardCircle />
        </button>
      </div>
      <div className="flex flex-row">
        <div className="pl-4 pr-4 pb-4 w-[100%] flex flex-col">
          <div className="text-4xl text-brown font-bold">{`${game.name} - Waiting Room`}</div>
          <div className="mb-3"></div>
        </div>
      </div>
      <div className="p-4">
        <div className="text-2xl text-brown font-bold">Players:</div>
        <div className="flex flex-wrap">
          {players.map((player) => (
            <div className="text-lg text-brown font-semibold m-2">{`${player}`}</div>
          ))}
        </div>
        <div className="text-xl text-brown font-bold">{`Total Amount: ${players.length}`}</div>
      </div>
      <div className="p-4">
        <button
          className="p-2.5 w-[100%] bg-brown text-xl text-orange-100 hover:bg-amber-700 rounded-lg cursor-pointer"
          type="button"
          onClick={startGame}
        >
          START GAME
        </button>
      </div>
    </Container>
  );
};

export default WaitingRoom;
