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
  toMain: () => void;
}

function SavedGames({ toMain }: IProps) {
  // Mock data for saved games
  const [showEndedGames, setShowEndedGames] = useState<boolean>(false);
  const [games, setGames] = useState<Game[]>([
    {
      id: 1,
      title: "Math 1.3.24",
      description:
        "Math questions for 1st grade students, including addition and subtraction up to 10",
      questionaire: "Math",
      map: "Asia",
      numGroups: 3,
      status: "created",
    },
    {
      id: 2,
      title: "Economy",
      description: "11th grade economy",
      questionaire: "11th grade economy",
      map: "Africa",
      numGroups: 2,
      status: "ended",
    },
    {
      id: 3,
      title: "Geography - Nitzan's class",
      description: "Geography question for 5th grade students",
      questionaire: "Geography",
      map: "Europe",
      numGroups: 2,
      status: "created",
    },

    {
      id: 4,
      title: "History class 31.12.23",
      description: "History questions",
      questionaire: "History",
      map: "America",
      numGroups: 5,
      status: "ended",
    },
    {
      id: 5,
      title: "Random Qustions",
      description: "Random questions",
      questionaire: "random 3",
      map: "Middle east",
      numGroups: 3,
      status: "ended",
    },
  ]);

  const handleStartGame = (game: Game) => {
    game.status === "created" && alert(`Game ${game.id} started!`);
  };

  const handleBack = () => {
    toMain();
  };

  const shortAndLong = (text: string, maxChars: number) => {
    let short =
      text.length > maxChars
        ? text.slice(0, maxChars).trim().concat("...")
        : text;

    const showLong = (
      <div className="">
        <div className="flex p-1 justify-between items-end">
          <div
            style={{ fontSize: "14px", lineHeight: "14px" }}
            className="mr-1"
          >{`${text}`}</div>
          <button
            style={{ fontSize: "9px", lineHeight: "14px" }}
            className="text-blue-600 font-semibold min-w-[55px]"
            type="button"
            onClick={() => setShow(showShort)}
          >{`(show less)`}</button>
        </div>
      </div>
    );

    const showShort = (
      <div className="">
        <div className="flex p-1 items-end justify-between">
          <div
            style={{ fontSize: "14px", lineHeight: "14px" }}
            className="mr-1"
          >{`${short}`}</div>
          <button
            style={{ fontSize: "9px", lineHeight: "14px" }}
            className="text-blue-600 font-semibold min-w-[55px]"
            type="button"
            onClick={() => setShow(showLong)}
          >{`(show more)`}</button>
        </div>
      </div>
    );

    const [show, setShow] = useState<ReactNode>(showShort);

    return show;
  };

  const showGame = (game: Game, index: number) => {
    let bgColor = index % 2 === 0 ? "#fafafa" : "#e5e5e5";
    return (
      <div
        style={{ backgroundColor: bgColor }}
        className="border-2 border-neutral-400 rounded-md w-[95%] m-3"
      >
        <div className="flex">
          <div className="w-[35%]">
            <div className="p-1 text-md font-bold">{`${game.title}`}</div>{" "}
            <div>
              {game.description.length > 29 ? (
                shortAndLong(game.description, 29)
              ) : (
                <div
                  style={{ fontSize: "14px", lineHeight: "14px" }}
                  className="p-1 mr-1"
                >
                  {`${game.description}`}
                </div>
              )}
            </div>
          </div>
          <div className=""></div>
          <div className="w-[30%]">
            <div>{`Questionaire: ${game.questionaire}`}</div>
            <div>{`Number of Players: ${game.numGroups}`}</div>
          </div>
          <div className="w-[20%]">
            <div>{`Map: ${game.map}`}</div>
            <div>{`Status: ${game.status}`}</div>
          </div>
          <div className="w-[15%] flex items-center justify-center">
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

  return (
    <Container>
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
        {games.map(
          (game, index) =>
            (game.status !== "ended" || showEndedGames) && showGame(game, index)
        )}
      </div>
    </Container>
  );
}

export default SavedGames;
