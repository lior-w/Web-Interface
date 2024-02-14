import React, { useState } from "react";
import "./SavedGames.css";

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

function SavedGames() {
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

  return (
    <div className="saved-games-container">
      <h2>Saved Games</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Questionaire</th>
            <th>Map</th>
            <th>Number of Groups</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.title}</td>
              <td>{game.description}</td>
              <td>{game.questionaire}</td>
              <td>{game.map}</td>
              <td>{game.numGroups}</td>
              <td>{game.status}</td>
              <td>
                {(game.status === "created" && (
                  <button onClick={() => handleStartGame(game)}>Start</button>
                )) ||
                  (game.status === "started" && (
                    <button onClick={() => handleStartGame(game)}>
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
