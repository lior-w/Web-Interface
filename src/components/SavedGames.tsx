import React, { useState } from "react";

// Define a type for a game
interface Game {
  id: number;
  title: string;
  description: string;
  status: "created" | "started" | "ended"; // Example status values, adjust as needed
}

function SavedGames() {
  // Mock data for saved games
  const [games, setGames] = useState<Game[]>([
    {
      id: 1,
      title: "Game 1",
      description: "Description for Game 1",
      status: "created",
    },
    {
      id: 2,
      title: "Game 2",
      description: "Description for Game 2",
      status: "started",
    },
    {
      id: 3,
      title: "Game 3",
      description: "Description for Game 3",
      status: "ended",
    },
  ]);

  const handleStartGame = (gameId: number) => {
    // Here you can implement logic to start the game with the given ID
    alert(`Game ${gameId} started!`);
  };

  return (
    <div>
      <h2>Saved Games</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.title}</td>
              <td>{game.description}</td>
              <td>{game.status}</td>
              <td>
                {game.status === "created" && (
                  <button onClick={() => handleStartGame(game.id)}>
                    Start
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SavedGames;
