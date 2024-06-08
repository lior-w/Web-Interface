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

/*
export interface IGame {
  id: number;
  title: string;
  description: string;
  questionaire: string;
  map: string;
  numGroups: number;
  status: "created" | "ended";
}

const games: IGame[] = [
  {
    id: 1,
    title: "Exciting Adventure",
    description: "Embark on a thrilling journey through uncharted territories.",
    questionaire: "Adventure Questions",
    map: "Mystery Island",
    numGroups: 4,
    status: "created",
  },
  {
    id: 2,
    title: "Space Odyssey",
    description:
      "Explore the vast expanse of space and encounter alien civilizations.",
    questionaire: "Space Trivia",
    map: "Galaxy Alpha",
    numGroups: 5,
    status: "ended",
  },
  {
    id: 3,
    title: "Medieval Quest",
    description:
      "Step back in time and experience the wonders and perils of the medieval era.",
    questionaire: "Medieval History",
    map: "Kingdom of Camelot",
    numGroups: 3,
    status: "created",
  },
  {
    id: 4,
    title: "Underwater Expedition",
    description:
      "Dive into the depths of the ocean and discover hidden treasures.",
    questionaire: "Marine Biology",
    map: "Coral Reef",
    numGroups: 6,
    status: "ended",
  },
  {
    id: 5,
    title: "Jungle Safari",
    description:
      "Embark on an adventure through dense jungles and encounter exotic wildlife.",
    questionaire: "Jungle Trivia",
    map: "Amazon Rainforest",
    numGroups: 2,
    status: "created",
  },
  {
    id: 6,
    title: "Arctic Expedition",
    description:
      "Brave the icy wilderness of the Arctic and witness breathtaking landscapes.",
    questionaire: "Arctic Wildlife",
    map: "Frozen Tundra",
    numGroups: 4,
    status: "ended",
  },
  {
    id: 7,
    title: "Fantasy Quest",
    description:
      "Enter a world of magic and mythical creatures on an epic quest.",
    questionaire: "Fantasy Lore",
    map: "Realm of Eldoria",
    numGroups: 3,
    status: "created",
  },
  {
    id: 8,
    title: "Ancient Civilization",
    description:
      "Unravel the mysteries of ancient civilizations and their lost treasures.",
    questionaire: "Archaeology",
    map: "Land of the Pharaohs",
    numGroups: 5,
    status: "ended",
  },
  {
    id: 9,
    title: "Wild West Adventure",
    description:
      "Experience the lawless frontier of the Wild West and ride into the sunset.",
    questionaire: "Western Trivia",
    map: "Frontier Town",
    numGroups: 2,
    status: "created",
  },
  {
    id: 10,
    title: "Pirate Treasure Hunt",
    description:
      "Sail the high seas in search of buried pirate treasure and fend off rival crews.",
    questionaire: "Pirate Lore",
    map: "Caribbean Islands",
    numGroups: 6,
    status: "ended",
  },
];
*/

export interface IProps {
  token: Token;
  toMain: () => void;
  username: string | undefined;
  toWaitingRoom: (gameId: string) => void;
  pages: Pages;
}

export interface FlatGame {
  description: string;
  gameTime: string;
  groupAssignmentProtocol: string;
  host: string;
  id: string;
  mapId: string;
  mapName: string;
  name: string;
  numberOfGroups: string;
  questionTimeLimit: string;
  questionnaireId: string;
  questionnaireName: string;
  shared: string;
  status: string;
  timeCreated: string;
  timeLastUpdated: string;
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
  const [games, setGames] = useState<FlatGame[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAllGames = async () => {
      const url = `${server}/game/get_all_games`;
      try {
        const response = await axios.get(url);
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

  const showGame = (game: FlatGame, index: number) => {
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

  const gamesComperator: (a: FlatGame, b: FlatGame) => number = (
    a: FlatGame,
    b: FlatGame
  ) =>
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
