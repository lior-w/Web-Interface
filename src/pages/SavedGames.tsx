import React, { ReactNode, useState } from "react";
import Container from "../components/container";
import { IoArrowForwardCircle } from "react-icons/io5";
import { ThemeContext } from "@emotion/react";

// Define a type for a game
interface Game {
  id: number;
  title: string;
  description: string;
  questionaire: string;
  map: string;
  numGroups: number;
  status: "created" | "started" | "ended"; // Example status values, adjust as needed
}

export interface IProps {
  toMain: () => void;
}

function SavedGames({ toMain }: IProps) {
  // Mock data for saved games
  const [games, setGames] = useState<Game[]>([
    {
      id: 1,
      title: "Game 1",
      description:
        "Math questions for 1st grade students, including addition and subtraction up to 10",
      questionaire: "Math",
      map: "Asia",
      numGroups: 3,
      status: "created",
    },
    {
      id: 2,
      title: "Game 2",
      description: "Geography question for 5th grade students",
      questionaire: "Geography",
      map: "Europe",
      numGroups: 2,
      status: "started",
    },
    {
      id: 3,
      title: "Game 3",
      description: "History questions",
      questionaire: "History",
      map: "America",
      numGroups: 5,
      status: "ended",
    },
  ]);

  const handleStartGame = (game: Game) => {
    game.status === "created"
      ? alert(`Game ${game.id} started!`)
      : alert(`Game ${game.id} resumed!`);
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
    //let bgColor = index % 2 === 0 ? "#f0f9ff" : "#c0e0ff";
    let bgColor = index % 2 === 0 ? "#fafafa" : "#e5e5e5";
    return (
      <div
        style={{ backgroundColor: bgColor }}
        className="border-2 border-neutral-400 rounded-md w-[95%] m-3"
      >
        <div className="flex">
          <div className="w-[30%]">
            <div className="p-1 text-md font-bold">{`${game.title}`}</div>{" "}
            <div>
              {game.description.length > 23 ? (
                shortAndLong(game.description, 23)
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
          <div className="w-[35%] border-1 border-black">
            <div>questionaire</div>
            <div>map</div>
          </div>
          <div className="w-[25%] border-1 border-black">
            <div>number of groups</div>
            <div>status</div>
          </div>
          <div className="w-[10%] border-1 border-black">
            <div>button</div>
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
      <div>{games.map((game, index) => showGame(game, index))}</div>
    </Container>
  );
  /*
  return (
    <div className="p-4 bg-amber-200 items-center flex flex-col m-auto mt-4 border-solid border-4 border-amber-400 space-y-8 rounded-2xl max-w-[80%]">
      <button
        className="mt-6 p-2.5 w-40 text-xl bg-amber-400 hover:bg-amber-500 rounded-lg cursor-pointer"
        type="button"
        onClick={handleBack}
      >
        Back
      </button>
      <div className="text-6xl text-center font-bold">Saved Games</div>
      <table className="table-fixed text-left w-10/12 bg-gray-100 border-collapse rounded-2xl">
        <thead className="text-2xl">
          <th className="p-3 border">Title</th>
          <th className="p-3 border">Description</th>
          <th className="p-3 border">Questionaire</th>
          <th className="p-3 border">Map</th>
          <th className="p-3 border">Number of Groups</th>
          <th className="p-3 border">Status</th>
          <th className="p-3 border">Action</th>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr
              key={game.id}
              className={
                index % 2 === 0
                  ? "text-xl border bg-gray-200"
                  : "text-xl border bg-gray-100"
              }
            >
              <td className="p-3 border">{game.title}</td>
              <td className="p-3 border">{game.description}</td>
              <td className="p-3 border">{game.questionaire}</td>
              <td className="p-3 border">{game.map}</td>
              <td className="p-3 border">{game.numGroups}</td>
              <td className="p-3 border">{game.status}</td>
              <td className="p-3 border">
                {(game.status === "created" && (
                  <button
                    className="p-2.5 bg-amber-300 hover:bg-amber-500 rounded-lg cursor-pointer"
                    onClick={() => handleStartGame(game)}
                  >
                    Start
                  </button>
                )) ||
                  (game.status === "started" && (
                    <button
                      className="p-2.5 bg-amber-300 hover:bg-amber-500 rounded-lg cursor-pointer"
                      onClick={() => handleStartGame(game)}
                    >
                      Resume
                    </button>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  */
}

export default SavedGames;
