import React, { ReactNode, useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import { ThemeContext } from "@emotion/react";
import Switch from "@mui/material/Switch";

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
  token: string;
  toMain: () => void;
}

function SavedGames({ token, toMain }: IProps) {
  // Mock data for saved games
  const [showEndedGames, setShowEndedGames] = useState<boolean>(false);
  const [games, setGames] = useState<Game[]>([
    {
      id: 1,
      title: "Exciting Adventure",
      description:
        "Embark on a thrilling journey through uncharted territories.",
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
  ]);

  const handleStartGame = (game: Game) => {
    game.status === "created" && alert(`Game ${game.id} started!`);
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
            <div className="text-md font-bold">{`${game.title}`}</div>{" "}
            <div className="text-sm">{`${game.description}`}</div>
          </div>
          <div className="p-1 w-[35%] flex flex-col justify-between ml-8 mr-8">
            <div className="flex ">
              <div className="mr-4">Questionaire:</div>
              <div className="font-bold">{`${game.questionaire}`}</div>
            </div>
            <div className="flex">
              <div className="mr-4">Map:</div>
              <div className="font-bold">{`${game.map}`}</div>
            </div>
          </div>
          <div className="p-1 w-[35%] flex flex-col justify-between">
            <div className="flex">
              <div className="mr-4">Groups:</div>
              <div className="font-bold">{`${game.numGroups}`}</div>
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
                  onClick={(e) => handleStartGame(game)}
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

  const gamesComp: (a: Game, b: Game) => number = (a: Game, b: Game) =>
    a.status === b.status
      ? a.title.localeCompare(b.title)
      : a.status === "created"
      ? -1
      : 1;

  return (
    <Container w="80%" h="auto">
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
        {games
          .sort(gamesComp)
          .filter((game) => showEndedGames || game.status !== "ended")
          .map((game, index) => showGame(game, index))}
      </div>
    </Container>
  );
}

export default SavedGames;
