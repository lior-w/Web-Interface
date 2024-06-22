import React, { ReactNode, useEffect, useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import { ThemeContext } from "@emotion/react";
import Switch from "@mui/material/Switch";
import {
  Token,
  User,
  Map,
  Question,
  Questionnaire,
  Game,
  Pages,
} from "../types";
import axios, { AxiosResponse } from "axios";
import Loading from "../components/loading";
import { server } from "../main";

export interface IProps {
  token: Token;
  toMain: () => void;
  username: string | undefined;
  toWaitingRoom: (gameId: string) => void;
  pages: Pages;
}

export const SavedGames = ({
  token,
  toMain,
  username,
  toWaitingRoom,
  pages,
}: IProps) => {
  // Mock data for saved games
  const [showEndedGames, setShowEndedGames] = useState<boolean>(false);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAllGames = async () => {
      const url = `${server}/game/get_all_games`;
      const headers = { AUTHORIZATION: token.AUTHORIZATION };
      try {
        const response = await axios.get(url, { headers });
        setGames(response.data.value);
        setLoading(false);
      } catch (error) {
        alert(error);
      }
    };

    loadAllGames();
  }, []);

  const handleStartGame = (gameId: string) => {
    toWaitingRoom(gameId);
  };

  const handleBack = () => {
    toMain();
  };

  const showGame = (game: Game, index: number) => {
    let bgColor = index % 2 === 0 ? "#fafafa" : "#e5e5e5";
    return (
      <div
        style={{ backgroundColor: bgColor }}
        className="border-2 border-neutral-400 rounded-md w-[97%] m-3"
      >
        <div className="flex">
          <div className="w-[30%] p-1 flex flex-col justify-evenly">
            <div className="text-md font-bold">{`${game.name}`}</div>{" "}
            <div className="text-sm">{`${game.description}`}</div>
          </div>
          <div className="p-1 w-[35%] flex flex-col justify-between ml-8 mr-8">
            <div className="flex ">
              <div className="mr-4">Questionaire:</div>
              <div className="font-bold">{`${game.questionnaire.name}`}</div>
            </div>
            <div className="flex">
              <div className="mr-4">Map:</div>
              <div className="font-bold">{`${game.map.name}`}</div>
            </div>
          </div>
          <div className="p-1 w-[35%] flex flex-col justify-between">
            <div className="flex">
              <div className="mr-4">Groups:</div>
              <div className="font-bold">{`${game.configuration.numberOfGroups}`}</div>
            </div>
            <div className="flex">
              <div className="mr-4">Status:</div>
              <div className="font-bold">{`${game.status}`}</div>
            </div>
          </div>

          <div className="w-[10%] flex items-center justify-center">
            <div className="">
              {game.status !== "ended" && (
                <button
                  className="w-[60px] h-[25px] bg-cyan-500 text-cyan-900 text-sm border-1 border-cyan-700 rounded-md"
                  type="button"
                  onClick={(e) => handleStartGame(game.id)}
                >
                  START
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gamesComperator: (a: Game, b: Game) => number = (a: Game, b: Game) =>
    a.status === b.status
      ? a.name.localeCompare(b.name)
      : a.status === "created"
      ? -1
      : 1;

  return (
    <Container page="My Games" pages={pages} username={username}>
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
          <div className="text-4xl text-brown font-bold">Saved Games</div>
          <div className="mb-3"></div>
        </div>
      </div>
      <div className="pl-5 flex items-center">
        <div className="pr-1 text-brown font-semibold">Show ended games</div>
        <Switch
          {...{
            color: "info",
            size: "medium",
            value: { showEndedGames },
            defaultChecked: false,
            onChange: (e) => setShowEndedGames(!showEndedGames),
          }}
        />
      </div>
      <div>
        {loading && <Loading msg="Loading Games" size={60}></Loading>}
        {games
          .sort(gamesComperator)
          .filter((game) => showEndedGames || game.status !== "ended")
          .map((game, index) => showGame(game, index))}
      </div>
    </Container>
  );
};
