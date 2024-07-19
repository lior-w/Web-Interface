import { useEffect, useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import Switch from "@mui/material/Switch";
import { Token, Game, Pages, GameLean } from "../types";
import axios from "axios";
import Loading from "../components/loading";
import { server } from "../main";
import { filterPages } from "./dashboard";

export interface IProps {
  token: Token;
  username: string | undefined;
  setGameId: (id: string) => void;
  pages: Pages;
}

export const SavedGames = ({ token, username, setGameId, pages }: IProps) => {
  const [games, setGames] = useState<GameLean[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAllGames = async () => {
      const url = `${server}/game/get_all_games_lean`;
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
    setGameId(gameId);
    pages["Waiting Room"]();
  };

  const showGame = (game: GameLean, index: number) => {
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
              <div className="font-bold">{`${game.questionnaireName}`}</div>
            </div>
            <div className="flex">
              <div className="mr-4">Map:</div>
              <div className="font-bold">{`${game.mapName}`}</div>
            </div>
          </div>
          <div className="p-1 w-[35%] flex flex-col justify-between">
            <div className="flex">
              <div className="mr-4">Groups:</div>
              <div className="font-bold">{`${game.numberOfGroups}`}</div>
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

  const gamesComperator: (a: GameLean, b: GameLean) => number = (
    a: GameLean,
    b: GameLean
  ) =>
    a.status === b.status
      ? a.name.localeCompare(b.name)
      : a.status === "created"
      ? -1
      : 1;

  return (
    <Container
      page="Games"
      pages={filterPages(pages, [
        "Main",
        "New Game",
        "New Question",
        "New Questionnaire",
        "Games",
        "Logout",
      ])}
      username={username}
    >
      <div className="flex flex-row">
        <div className="pl-4 pr-4 pb-4 w-[100%] flex flex-col">
          <div className="text-4xl mb-3 text-black font-bold">Games</div>
        </div>
      </div>
      <div>
        {loading && <Loading msg="Loading Games" size={60}></Loading>}
        {games
          .sort(gamesComperator)
          .map((game, index) => showGame(game, index))}
      </div>
    </Container>
  );
};
