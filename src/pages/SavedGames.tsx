import { useState } from "react";

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
      description: "Description for Game 1",
      questionaire: "Math",
      map: "Asia",
      numGroups: 3,
      status: "created",
    },
    {
      id: 2,
      title: "Game 2",
      description: "Description for Game 2",
      questionaire: "Geography",
      map: "Europe",
      numGroups: 2,
      status: "started",
    },
    {
      id: 3,
      title: "Game 3",
      description: "Description for Game 3",
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
}

export default SavedGames;
