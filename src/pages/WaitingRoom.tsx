import React, { ReactNode, useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import { ThemeContext } from "@emotion/react";
import Switch from "@mui/material/Switch";
import axios from "axios";

// Define a type for a game
interface Game {
  id: number;
  title: string;
  description: string;
  questionaire: string;
  map: string;
  numGroups: number;
  status: "created" | "ended";
}

export interface IProps {
  toMain: () => void;
  game: Game;
}

const WaitingRoom = ({ toMain, game }: IProps) => {
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

  const getPlayers = async () => {};

  const startGame = () => {};

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
          <div className="text-4xl text-brown font-bold">{`${game.title} - Waiting Room`}</div>
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
